# Backend Authentication

- All authentication (login/signup) checks use MongoDB only. No seed or in-memory users are used for login.
- Users must be created in MongoDB (via signup, CLI, or seed script) to be able to log in.
- Login checks: email and bcrypt-hashed password are validated against MongoDB users.
- If you use the CLI script to create users, those users are stored in MongoDB and can log in via the frontend.
