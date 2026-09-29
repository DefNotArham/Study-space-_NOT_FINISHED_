SELECT user_id, expires_at
FROM email_verification_tokens
WHERE token = %s;