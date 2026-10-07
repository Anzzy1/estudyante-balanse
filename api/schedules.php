<?php
// Schedules API (lahat kailangan ng user_id)
// GET  ?action=list&user_id=1        -> subjects, commitments, today, preferences
// POST ?action=save   { user_id, subjects[], commitments[], preferences{} }
// POST ?action=today  { user_id, date, name, start, end }
// POST ?action=update_today { user_id, id, name, start, end }
// POST ?action=delete { user_id, kind, id }   (kind: subject|commitment|today)
require __DIR__ . '/config.php';

$action = $_GET['action'] ?? '';
$uid = (int) ($_GET['user_id'] ?? body()['user_id'] ?? 0);
if ($uid <= 0) out(['success' => false, 'error' => 'Kailangan ang user_id (mag-login muna).'], 401);

if ($_SERVER['REQUEST_METHOD'] === 'GET' && $action === 'list') {
    $q = function ($sql) use ($pdo, $uid) {
        $s = $pdo->prepare($sql);
        $s->execute([$uid]);
        return $s->fetchAll(PDO::FETCH_ASSOC);
    };
    $prefs = $pdo->prepare('SELECT level, job, priorities, study_time, task_time FROM preferences WHERE user_id = ?');
    $prefs->execute([$uid]);
    out(['success' => true, 'data' => [
        'subjects' => $q('SELECT id, name, start_time AS start, end_time AS `end`, days, color FROM subjects WHERE user_id = ? ORDER BY id'),
        'commitments' => $q('SELECT id, name, start_time AS start, end_time AS `end`, days, icon FROM commitments WHERE user_id = ? ORDER BY id'),
        'today' => $q('SELECT id, sched_date AS date, name, start_time AS start, end_time AS `end` FROM today_schedules WHERE user_id = ? ORDER BY sched_date, start_time'),
        'preferences' => $prefs->fetch(PDO::FETCH_ASSOC) ?: null,
    ]]);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $action === 'save') {
    $d = body();
    $pdo->beginTransaction();
    try {
        $pdo->prepare('DELETE FROM subjects WHERE user_id = ?')->execute([$uid]);
        $ins = $pdo->prepare('INSERT INTO subjects (user_id, name, start_time, end_time, days, color) VALUES (?, ?, ?, ?, ?, ?)');
        foreach (($d['subjects'] ?? []) as $s) {
            if (empty($s['name'])) continue;
            $ins->execute([$uid, $s['name'], $s['start'] ?? '08:00', $s['end'] ?? '09:00', $s['days'] ?? '', $s['color'] ?? 'blue']);
        }
        $pdo->prepare('DELETE FROM commitments WHERE user_id = ?')->execute([$uid]);
        $inc = $pdo->prepare('INSERT INTO commitments (user_id, name, start_time, end_time, days, icon) VALUES (?, ?, ?, ?, ?, ?)');
        foreach (($d['commitments'] ?? []) as $c) {
            if (empty($c['name'])) continue;
            $inc->execute([$uid, $c['name'], $c['start'] ?? '08:00', $c['end'] ?? '09:00', $c['days'] ?? '', $c['icon'] ?? '💼']);
        }
        $p = $d['preferences'] ?? [];
        $pdo->prepare('REPLACE INTO preferences (user_id, level, job, priorities, study_time, task_time) VALUES (?, ?, ?, ?, ?, ?)')->execute([
            $uid, $p['level'] ?? '', $p['job'] ?? '', $p['priorities'] ?? '', $p['studyTime'] ?? '', $p['taskTime'] ?? '',
        ]);
        $pdo->commit();
    } catch (Exception $e) {
        $pdo->rollBack();
        out(['success' => false, 'error' => 'Save failed.'], 500);
    }
    out(['success' => true]);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $action === 'today') {
    $d = body();
    if (empty($d['name']) || empty($d['start']) || empty($d['end']) || empty($d['date'])) {
        out(['success' => false, 'error' => 'Kumpletuhin ang details.'], 400);
    }
    $pdo->prepare('INSERT INTO today_schedules (user_id, sched_date, name, start_time, end_time) VALUES (?, ?, ?, ?, ?)')
        ->execute([$uid, $d['date'], $d['name'], $d['start'], $d['end']]);
    out(['success' => true, 'id' => (int) $pdo->lastInsertId()]);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $action === 'update_today') {
    $d = body();
    if (empty($d['id']) || empty($d['name']) || empty($d['start']) || empty($d['end'])) {
        out(['success' => false, 'error' => 'Kumpletuhin ang details.'], 400);
    }
    $pdo->prepare('UPDATE today_schedules SET name = ?, start_time = ?, end_time = ? WHERE id = ? AND user_id = ?')
        ->execute([$d['name'], $d['start'], $d['end'], (int) $d['id'], $uid]);
    out(['success' => true]);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $action === 'delete') {
    $d = body();
    $map = ['subject' => 'subjects', 'commitment' => 'commitments', 'today' => 'today_schedules'];
    $table = $map[$d['kind'] ?? ''] ?? null;
    if (!$table || empty($d['id'])) out(['success' => false, 'error' => 'Invalid delete.'], 400);
    $pdo->prepare("DELETE FROM $table WHERE id = ? AND user_id = ?")->execute([(int) $d['id'], $uid]);
    out(['success' => true]);
}

out(['success' => false, 'error' => 'Unknown action.'], 404);
