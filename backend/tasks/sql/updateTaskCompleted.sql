UPDATE tasks
SET
    completed = %s,
    status = CASE
        WHEN %s = TRUE THEN 'completed'
        ELSE 'todo'
    END
WHERE id = %s AND user_id = %s
RETURNING *;