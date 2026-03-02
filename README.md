## Notes App (MERN Stack)

Production-ready full-stack notes application built with Node.js, Express, MongoDB, React, and JWT auth using HttpOnly cookies.

### Folder structure

- **server**: Backend (Node.js, Express, MongoDB, JWT, HttpOnly cookies)
- **client**: Frontend (React + Vite, Axios, React Router)

### Prerequisites

- Node.js 18+
- MongoDB running locally or in the cloud (e.g. MongoDB Atlas)

### Backend setup (`server`)

1. Install dependencies:

```bash
cd server
npm install
```

2. Create `.env` in `server` based on `.env.example`:

```bash
cp .env.example .env
```

Set:

- `MONGO_URI` – your MongoDB connection string
- `JWT_SECRET` – a strong random secret
- `CLIENT_URL` – frontend origin (default `http://localhost:5173`)

3. Run the backend:

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

### Frontend setup (`client`)

1. Install dependencies:

```bash
cd client
npm install
```

2. Create `.env` in `client` based on `.env.example`:

```bash
cp .env.example .env
```

Ensure `VITE_API_URL` points to the backend (default `http://localhost:5000`).

3. Run the frontend:

```bash
npm run dev
```

The app will be available at the URL printed by Vite (by default `http://localhost:5173`).

### Authentication & Security

- Passwords are hashed with `bcrypt`.
- JWTs are signed with `JWT_SECRET` and stored only in **HttpOnly cookies**.
- Cookies use `httpOnly`, `sameSite`, and `secure` (in production) flags.
- API uses `cors` configured with `credentials: true` and `origin` set from `CLIENT_URL`.

### API overview

- `POST /api/auth/register` – register user
- `POST /api/auth/login` – login user
- `POST /api/auth/logout` – logout (clears cookie)
- `GET /api/auth/me` – current logged-in user

Protected notes routes (require auth cookie):

- `POST /api/notes` – create note
- `GET /api/notes` – list user notes
- `GET /api/notes/:id` – get single note
- `PUT /api/notes/:id` – update note
- `DELETE /api/notes/:id` – delete note

### Frontend behavior

- Login and register pages share a reusable `AuthForm`.
- Auth state is managed in memory; user info is loaded from `/api/auth/me` on app load.
- Notes page supports create, update, delete with loading and error states.
- Protected routes redirect unauthenticated users to the login page.

