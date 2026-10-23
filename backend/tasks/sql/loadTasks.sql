SELECT id, user_id, title, description, subject, priority, completed, due_date, created_at
FROM tasks
WHERE user_id = %s
ORDER BY created_at DESC;