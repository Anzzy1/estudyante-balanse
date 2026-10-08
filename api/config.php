<?php
// Database connection (XAMPP defaults)
header('Content-Type: application/json; charset=utf-8');

$DB_HOST = '127.0.0.1';
$DB_NAME = 'estudyante_balanse';
$DB_USER = 'root';
$DB_PASS = '';
$GROQ_KEY = ''; // Set via api/keys.local.php (gitignored, never commit)
$__keysFile = __DIR__ . '/keys.local.php';
if (is_file($__keysFile)) {
    $__k = include $__keysFile;
    if (is_array($__k) && !empty($__k['GROQ_KEY'])) $GROQ_KEY = trim((string) $__k['GROQ_KEY']);
    unset($__k);
}
unset($__keysFile);

try {
    $pdo = new PDO(
        "mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8mb4",
        $DB_USER,
        $DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database connection failed']);
    exit;
}

function body() {
    $d = json_decode(file_get_contents('php://input'), true);
    return is_array($d) ? $d : [];
}

function out($data, $code = 200) {
    http_response_code($code);
    echo json_encode($data);
    exit;
}
