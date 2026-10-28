
DELETE FROM tasks
WHERE id = %s
  AND user_id = %s
RETURNING *;
