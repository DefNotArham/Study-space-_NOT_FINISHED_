DELETE FROM study_room_members
WHERE room_id = %s
AND user_id = %s;