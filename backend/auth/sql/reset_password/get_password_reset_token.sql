SELECT user_id, expires_at
FROM password_reset_tokens
WHERE token = %s;
