# Backend documentation

## Folder structure

```text
Server/
├── configs/
│   ├── cloudinary.js
│   └── dbConfig.js
├── controller/
│   ├── authController.js
│   └── projectController.js
├── helpers/
│   ├── cloudinaryService.js
│   ├── emailTemplets.js
│   ├── mailService.js
│   ├── multer.js
│   └── utils.js
├── middleware/
│   └── authMiddleWare.js
├── models/
│   ├── authSchema.js
│   └── projectSchema.js
├── routes/
│   ├── authRoute.js
│   ├── index.js
│   └── projectsRoute.js
└── server.js
```

## Authentication flow

1. A client registers with name, email, and password.
2. The server validates the request, stores an unverified user, creates a four-digit OTP valid for four minutes, and emails it.
3. The client verifies the account with the same email and OTP.
4. The client logs in with email and password.
5. The server sets the JWT in the `accessToken` HTTP-only cookie.
6. A protected request includes that cookie automatically when the frontend uses `credentials: "include"`.
7. `authMiddleWare` verifies the JWT and attaches its payload as `req.user`.
8. Logout clears the same cookie.

## API endpoints

| Method | Endpoint | Protected | Request body | Success response |
| --- | --- | --- | --- | --- |
| GET | `/` | No | — | `hello from server` |
| POST | `/auth/registration` | No | `{ "fullName": "Ada", "email": "ada@example.com", "password": "password1" }` | `{ "message": "registration Successfull!" }` |
| POST | `/auth/verify-otp` | No | `{ "email": "ada@example.com", "otp": "1234" }` | `{ "message": "Email verification successful" }` |
| POST | `/auth/login` | No | `{ "email": "ada@example.com", "password": "password1" }` | `{ "message": "Login successful!" }` and `accessToken` cookie |
| POST | `/auth/logout` | No | — | `{ "message": "Logout successful!" }` |
| GET | `/auth/profile` | Yes | — | `{ "_id": "...", "avatar": "", "fullName": "Ada", "email": "ada@example.com" }` |
| PUT | `/auth/update-profile` | Yes | `multipart/form-data`: `fullName` and optional `avatar` file | `{ "message": "Profile update successfully" }` |
| POST | `/projects/create` | Yes | `{ "Title": "Launch", "description": "Prepare release" }` | `{ "message": "project created successfully!" }` |
| GET | `/projects/list?search=launch` | Yes | — | `{ "projects": [...] }` |
| POST | `/projects/add` | Yes | `{ "email": "member@example.com", "projectId": "..." }` | `{ "message": "Team member added successfully" }` |
| POST | `/projects/addtask` | Yes | `{ "Title": "Review", "discription": "Review PR", "priority": "high", "assignedTo": ["..."], "projectId": "..." }` | `{ "message": "Task added successfully" }` |

## Project-list response shape

```json
{
  "projects": [
    {
      "_id": "...",
      "Title": "Launch",
      "discription": "Prepare release",
      "slug": "launch",
      "author": {
        "_id": "...",
        "fullName": "Ada",
        "avatar": ""
      },
      "members": [
        {
          "_id": "...",
          "fullName": "Sam",
          "avatar": ""
        }
      ],
      "task": []
    }
  ]
}
```

`description` is the create-project request field. `discription` is the existing persisted and response field name.

## Validation

- `fullName` is required for registration.
- Email must match the server email pattern.
- Password must be at least eight alphanumeric characters and contain both a letter and a number.
- Registration rejects an existing email.
- OTP verification requires a matching, unexpired OTP.
- Login requires an existing, verified account and correct password.
- Project creation requires non-empty `Title` and `description`.
- Project task priorities are `high`, `mideum`, or `Normal`.
- `assignedTo`, when provided to task creation, must be an array of the project's author/member IDs.

## Middleware and protected routes

`authMiddleWare` reads `req.cookies.accessToken`, validates it with `JWT_SECRET_KEY`, and sets `req.user`.

Protected endpoints:

- `GET /auth/profile`
- `PUT /auth/update-profile`
- `POST /projects/create`
- `GET /projects/list`
- `POST /projects/add`
- `POST /projects/addtask`

## Cookie behavior

- Login sets an `accessToken` cookie.
- The cookie is `httpOnly`, so browser JavaScript cannot read the JWT.
- The cookie uses `sameSite: "lax"`.
- `secure` is enabled when `NODE_ENV` is `production`.
- The frontend must send requests with `credentials: "include"`.
- Logout clears `accessToken` with the same cookie options.
