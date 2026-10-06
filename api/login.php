<?php
// POST { email, password } -> { success, user }
require __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') out(['success' => false, 'error' => 'POST only'], 405);

$d = body();
$email = trim($d['email'] ?? '');
$pass = $d['password'] ?? '';

if ($email === '' || $pass === '') out(['success' => false, 'error' => 'Ilagay ang email at password.'], 400);

$stmt = $pdo->prepare('SELECT id, name, email, password FROM users WHERE email = ?');
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user || !password_verify($pass, $user['password'])) {
    out(['success' => false, 'error' => 'Maling email o password.'], 401);
}

unset($user['password']);
out(['success' => true, 'user' => $user]);
