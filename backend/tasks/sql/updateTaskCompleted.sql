UPDATE tasks
SET completed = %s
WHERE id = %s AND user_id = %s
RETURNING *;