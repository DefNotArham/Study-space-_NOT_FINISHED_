UPDATE users
SET email_verified = TRUE
WHERE id = %s;