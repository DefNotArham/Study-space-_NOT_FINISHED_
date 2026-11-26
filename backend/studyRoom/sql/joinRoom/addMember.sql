INSERT INTO study_rooms_members (room_id, user_id)
VALUES (%s, %s)
ON CONFLICT (room_id, user_id) DO NOTHING;