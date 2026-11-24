SELECT *
FROM study_rooms
WHERE id IN (
    SELECT room_id
    FROM study_room_members
    WHERE user_id = %s
)
ORDER BY created_at DESC;