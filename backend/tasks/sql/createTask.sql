INSERT INTO tasks (user_id, title ,description, subject, priority)
VALUES (%s, %s, %s, %s, %s)
RETURNING id; 