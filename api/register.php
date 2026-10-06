<?php
// POST { name, email, password } -> { success, user }
require __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') out(['success' => false, 'error' => 'POST only'], 405);

$d = body();
$name = trim($d['name'] ?? '');
$email = trim($d['email'] ?? '');
$pass = $d['password'] ?? '';

if ($name === '' || $email === '' || $pass === '') out(['success' => false, 'error' => 'Kumpletuhin ang name, email, at password.'], 400);
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) out(['success' => false, 'error' => 'Invalid email.'], 400);
if (strlen($pass) < 4) out(['success' => false, 'error' => 'Password ay dapat 4+ characters.'], 400);

$check = $pdo->prepare('SELECT id FROM users WHERE email = ?');
$check->execute([$email]);
if ($check->fetch()) out(['success' => false, 'error' => 'Email ay nakarehistro na. Mag-login na lang.'], 409);

$stmt = $pdo->prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
$stmt->execute([$name, $email, password_hash($pass, PASSWORD_DEFAULT)]);

$uid = (int) $pdo->lastInsertId();
$pdo->prepare('INSERT INTO preferences (user_id) VALUES (?)')->execute([$uid]);

out(['success' => true, 'user' => ['id' => $uid, 'name' => $name, 'email' => $email]]);
