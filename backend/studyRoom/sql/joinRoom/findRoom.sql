SELECT id, host_id, name, description, invite_code, created_at
FROM study_rooms
WHERE invite_code = %s;