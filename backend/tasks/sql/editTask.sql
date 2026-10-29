UPDATE tasks
SET title = %s, description = %s, subject = %s, priority = %s, due_date = %s 
WHERE id = %
    AND user_id = %s 
RETURNING *;