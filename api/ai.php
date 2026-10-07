<?php
// Groq AI proxy â€” tumatanggap ng schedule context, nage-return ng suggestion
// POST { user_id, context } -> { success, suggestion, title? }
require __DIR__ . '/config.php';

global $GROQ_KEY;
if (empty($GROQ_KEY)) {
    out(['success' => false, 'error' => 'Walang AI key. I-set ang GROQ_KEY sa config.php.'], 500);
}

$d = body();
$uid = (int) ($d['user_id'] ?? 0);
$context = trim((string) ($d['context'] ?? ''));
if ($uid <= 0 || $context === '') {
    out(['success' => false, 'error' => 'Kailangan ang user_id at context.'], 400);
}

$mode = $d['mode'] ?? 'suggestion';

if ($mode === 'recs') {
    $system = "You are Nova, a friendly study planner assistant for students. "
        . "Given the student's schedule context, energy level, and the EXACT current time, reply with STRICT JSON only: "
        . '{"items":[{"title":"...","desc":"...","btn":"..."},{"title":"...","desc":"...","btn":"..."},{"title":"...","desc":"...","btn":"..."}]} '
        . "Provide exactly 3 short, practical recommendations (max 6 words title, 1 sentence desc, 2-3 word button). "
        . "If the current time is late at night (10 PM to 5 AM), ALL 3 recommendations MUST be about resting, sleeping, or light calming activities. NEVER suggest studying, preparing for work, or reviewing lessons at that time. At midnight/early morning, recommend proper SLEEP (6+ hours), NEVER a 20-minute nap. A short nap is only for early afternoon when the student still has to be awake later. Do not add any text outside the JSON.";
} else {
    $system = "You are Nova, a friendly and concise study planner assistant for students. "
        . "Given the student's schedule context, energy level, and the EXACT current time, reply with STRICT JSON only: "
        . '{"title": "...", "description": "..."} '
        . "The title must be short (max 8 words) and encouraging. The description must be 1-2 sentences, "
        . "practical, and must match the student's current time and energy. IMPORTANT: If the current time is late at night (around 10 PM to 5 AM) and the student has no urgent schedule, NEVER suggest studying or continuing work. Late at night, always suggest proper SLEEP or long rest (e.g., 6-8 hours of sleep), not a short nap and not a light activity like scrolling. If it is early afternoon and the student is tired, a short nap is okay, but at night it should be sleep. Do not add any text outside the JSON.";
}

$payload = [
    'model' => 'openai/gpt-oss-20b',
    'messages' => [
        ['role' => 'system', 'content' => $system],
        ['role' => 'user', 'content' => $context],
    ],
    'temperature' => 0.7,
    'max_tokens' => 512,
];

$ch = curl_init('https://api.groq.com/openai/v1/chat/completions');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $GROQ_KEY,
    ],
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_TIMEOUT => 20,
]);
$raw = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($raw === false || $code >= 400) {
    out(['success' => false, 'error' => 'AI request failed.', 'raw' => $raw === false ? curl_error($ch) : $raw], 502);
}

$j = json_decode($raw, true);
$text = $j['choices'][0]['message']['content'] ?? '';
$text = trim(preg_replace('/^```(json)?|```$/m', '', $text));
if (preg_match('/\{.*\}/s', $text, $m)) { $text = $m[0]; }
$parsed = json_decode($text, true);

if ($mode === 'recs') {
    $items = $parsed['items'] ?? null;
    if (!is_array($items) || !count($items)) out(['success' => false, 'error' => 'Unexpected AI response.', 'raw' => $text], 502);
    out(['success' => true, 'items' => array_slice($items, 0, 3)]);
}

if (!is_array($parsed) || empty($parsed['title'])) {
    out(['success' => false, 'error' => 'Unexpected AI response.', 'raw' => $text], 502);
}

out(['success' => true, 'title' => $parsed['title'], 'description' => $parsed['description'] ?? '']);
