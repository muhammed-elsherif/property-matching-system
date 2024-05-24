## How to Run the Project Locally

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up a MongoDB database.
4. Create a `.env` file with the following content:

MONGODB_URL=<your-mongodb-url>
JWT_SECRET=<your-jwt-secret>

5. Run the application using `npm start`.
6. Run tests using `npm test`.

# Assumptions and Decisions:

- Users are authenticated via JWT tokens.
- Passwords are hashed using bcrypt.
- Performance considerations include efficient matching logic and pagination.

Include a sample MongoDB backup file (src/date) in the repository for testing.
