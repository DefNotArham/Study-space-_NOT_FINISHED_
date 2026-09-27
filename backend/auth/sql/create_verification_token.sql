INSERT INTO email_verification_tokens (user_id, token, expires_at)
VALUES (%s, %s, %s);