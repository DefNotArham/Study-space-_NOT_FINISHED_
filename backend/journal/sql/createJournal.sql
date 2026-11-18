INSERT INTO journals (
    user_id,
    title,
    content
)
VALUES ($1, $2, $3)
RETURNING
    id AS journal_id,
    user_id,
    title,
    content,
    created_at;