INSERT INTO study_rooms (
    host_id,
    name,
    description,
    invite_code
)
VALUES (%s, %s, %s, %s)
RETURNING id, host_id, name, description, invite_code, created_at;