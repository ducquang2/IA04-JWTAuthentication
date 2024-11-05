# IA04 - JWT Authentication

This project is part of the Advanced Web Programming course - VNUHCMUS - 2024.

## Student Infomation

- Student Name: Nguyen Duc Quang
- Student ID: 20120359

## How to run

1. Clone the repository
2. Run the following command to install dependencies both for the API and the web project

```bash
yarn install
```

3. Add required environment variables to `.env` file in the root directory

```env
# FRONTEND
API_URL=http://localhost:3001

# BACKEND
DATABASE_URL=postgres://username:password@localhost:5432/dbname
```

4. Run the following command to start the API

```bash
cd ia03-be && yarn start:dev
```

5. Run the following command to start the web project

```bash
cd ia03-fe && yarn dev
```

## Rubric

| Criteria                    | Description                                                        | Score |
| --------------------------- | ------------------------------------------------------------------ | ----- |
| Registration Endpoint       | Works perfectly; validations and hashing are correct.              | 0.5   |
| Login Endpoint              | Works correctly; token generated and returned.                     | 0.5   |
| JWT Token Validation        | Proper middleware with token verification on all protected routes. | 0.5   |
| Profile (Protected Route)   | Protected route works; only accessible with valid token.           | 0.5   |
| Register page               |                                                                    | 1     |
| Login page                  |                                                                    | 1     |
| Profile page                |                                                                    | 1     |
| Home page                   | Display content based on authentication status                     | 1     |
| Frontend Form Handling      | All forms work smoothly; good UX with error handling.              | 1     |
| State Management            | State managed well; token and user info updated smoothly.          | 1     |
| Error Handling and Feedback | Comprehensive error handling; clear user feedback.                 | 1     |
| Public host                 | Public host deployment                                             | 1     |

## Deployment

- The API is deployed on [Render](https://dashboard.render.com/)
- The web project is deployed on [Vercel](https://ia-03-user-registration.vercel.app)
