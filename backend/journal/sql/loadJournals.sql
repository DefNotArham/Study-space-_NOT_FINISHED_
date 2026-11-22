SELECT
    id AS journal_id,
    user_id,
    title,
    content,
    created_at
FROM journals
WHERE user_id = %s
ORDER BY created_at DESC;