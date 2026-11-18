INSERT INTO journals (
    user_id,
    title,
    content
)
VALUES (%s, %s, %s)
RETURNING
    id AS journal_id,
    user_id,
    title,
    content,
    created_at;