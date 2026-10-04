SELECT id, email, username, password_hash, email_verified
FROM users
WHERE email = %s;