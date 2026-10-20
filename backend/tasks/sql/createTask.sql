INSERT INTO tasks (user_id, title, description, subject, priority, due_date)
VALUES (%s, %s, %s, %s, %s, %s)
RETURNING id, user_id, title, description, subject, priority, completed, due_date, created_a;