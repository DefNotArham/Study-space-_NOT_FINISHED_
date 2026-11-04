UPDATE tasks
SET
    status = %s,
    completed = CASE
        WHEN %s = 'completed' THEN TRUE
        ELSE FALSE
    END
WHERE id = %s AND user_id = %s
RETURNING *;