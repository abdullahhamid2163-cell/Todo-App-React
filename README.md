# 📝 React Todo App with Authentication

A simple full-stack style Todo application built with **React**, **React Router**, and a mock REST API powered by **JSON Server**. Users can sign up, log in, and manage their own personal list of tasks (add, update, delete) — with each user only able to see their own todos.

---

## 📌 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [How the App Works](#-how-the-app-works)
  - [Authentication Flow](#authentication-flow)
  - [Dashboard / Todos Flow](#dashboard--todos-flow)
- [Project Structure](#-project-structure)
- [API Endpoints (JSON Server)](#-api-endpoints-json-server)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Environment / Config Notes](#-environment--config-notes)
- [Known Limitations](#-known-limitations)
- [Future Improvements](#-future-improvements)
- [License](#-license)

---

## ✨ Features

- **User Registration** — create a new account with name, email, and password.
- **User Login** — authenticate with email and password.
- **Protected Dashboard** — only logged-in users can access the todo dashboard; unauthenticated users are redirected to the login page.
- **Per-User Todos** — each user only sees the todos that belong to them (filtered by `userId`).
- **Add Todo** — create a new task.
- **Update Todo** — edit an existing task's title.
- **Delete Todo** — remove a task.
- **Show/Hide Password** — toggle password visibility on both login and signup forms.
- **Basic Form Validation** — required fields, minimum password length, empty-task checks, and duplicate-email checks on signup.
- **Logout** — clears the session and returns to the login page.

---

## 🛠 Tech Stack

| Layer          | Technology                                   |
|----------------|-----------------------------------------------|
| Frontend       | React (functional components + Hooks)         |
| Routing        | React Router (`react-router-dom`)              |
| Styling        | Tailwind CSS utility classes                   |
| Backend (mock) | [JSON Server](https://github.com/typicode/json-server) running at `http://localhost:3000` |
| State/Storage  | React `useState` / `useEffect` + `localStorage` (for storing the logged-in session) |

> **Note:** This project does **not** use a real backend or database. It uses `json-server` to simulate a REST API from a local `db.json` file, which is great for prototyping and learning but is **not secure** for production use (see [Known Limitations](#-known-limitations)).

---

## ⚙️ How the App Works

### Authentication Flow

1. **Sign Up (`/signup`)**
   - The user fills in **name**, **email**, and **password**.
   - The app checks `GET /auth?email=...` on the mock API to see if an account with that email already exists.
   - If the email is free, it sends `POST /auth` with the new user's details to create the account.
   - On success, the user is redirected straight to `/dashboard`.

2. **Log In (`/login`)**
   - The user enters **email** and **password**.
   - The app calls `GET /auth?email=...` to find a matching account.
   - If a user is found and the password matches, the full user object is saved to `localStorage` under the key `"user"`.
   - The user is redirected to `/dashboard`.
   - If no match is found (or the password is wrong), a generic **"Invalid email or password"** message is shown (this avoids revealing whether the email exists).

3. **Session Persistence**
   - The logged-in user's info lives in `localStorage`.
   - Every time the **Dashboard** loads, it reads `localStorage.getItem("user")`.
   - If there's no user in storage, the app automatically redirects to `/login`.

4. **Log Out**
   - Clicking **Log Out** removes the `"user"` key from `localStorage` and redirects back to `/login`.

### Dashboard / Todos Flow

Once logged in, the **Dashboard** component (`/dashboard`) takes over:

1. **Fetching Todos**
   - On mount, it calls `GET /todos` to fetch *all* todos from the mock API.
   - It then filters that list on the client side to keep only the todos where `todo.userId` matches the logged-in user's `id`.

2. **Adding a Todo**
   - Typing a task and clicking **Add** sends `POST /todos` with the task title and the current user's `userId`.
   - The new todo returned by the server is appended to the local todo list (no page refresh needed).

3. **Updating a Todo**
   - Clicking **Update** opens a browser `prompt()` pre-filled with the current title.
   - The new title is sent via `PATCH /todos/:id`.
   - The local list is updated in place with the server's response.

4. **Deleting a Todo**
   - Clicking **Delete** sends `DELETE /todos/:id`.
   - The todo is removed from the local list immediately.

---

## 📁 Project Structure

```
src/
├── App.jsx                     # Sets up routing (Login, Signup, Dashboard)
├── components/
│   ├── Dashboard.jsx            # Main todo dashboard (protected route)
│   └── auth/
│       ├── login.jsx            # Login page
│       └── registration.jsx     # Signup page
└── ...
```

### Routes

| Path       | Component     | Description                          |
|------------|---------------|---------------------------------------|
| `/`        | `Login`       | Root path also shows the login page   |
| `/login`   | `Login`       | Login form                            |
| `/signup`  | `Registration`| Sign up / registration form           |
| `/dashboard`| `Dashboard`  | Protected — shows the user's todos    |

---

## 🔌 API Endpoints (JSON Server)

The app expects a mock API running at `http://localhost:3000` with two resources: `auth` (users) and `todos`.

### `auth` (Users)

| Method | Endpoint                     | Purpose                                  |
|--------|-------------------------------|-------------------------------------------|
| GET    | `/auth?email=<email>`         | Look up a user by email (login/signup check) |
| POST   | `/auth`                       | Create a new user account                |

**Example user object:**
```json
{
  "id": 1,
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "yourpassword"
}
```

### `todos`

| Method | Endpoint          | Purpose                          |
|--------|-------------------|------------------------------------|
| GET    | `/todos`           | Get all todos (filtered client-side by `userId`) |
| POST   | `/todos`           | Create a new todo                  |
| PATCH  | `/todos/:id`        | Update a todo's title              |
| DELETE | `/todos/:id`        | Delete a todo                      |

**Example todo object:**
```json
{
  "id": 1,
  "title": "Buy groceries",
  "userId": "1"
}
```

### Example `db.json` (used by json-server)

```json
{
  "auth": [
    { "id": 1, "name": "Jane Doe", "email": "jane@example.com", "password": "123456" }
  ],
  "todos": [
    { "id": 1, "title": "Buy groceries", "userId": "1" },
    { "id": 2, "title": "Finish homework", "userId": "1" }
  ]
}
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install JSON Server** (if not already a dependency)
   ```bash
   npm install json-server --save-dev
   ```

4. **Create a `db.json` file** in the project root (see the [example above](#example-dbjson-used-by-json-server)).

### Running the App

You need **two terminals** running at the same time — one for the mock API and one for the React app.

**Terminal 1 — start the mock API (JSON Server):**
```bash
npx json-server --watch db.json --port 3000
```
This serves your data at `http://localhost:3000`.

**Terminal 2 — start the React app:**
```bash
npm run dev
```
(or `npm start`, depending on how your project is set up)

Then open your browser at the address shown in the terminal (commonly `http://localhost:5173` for Vite or `http://localhost:3000`* for Create React App — *note: if both run on port 3000, change one of the ports).

---

## 🔧 Environment / Config Notes

- The API base URL (`http://localhost:3000`) is currently **hardcoded** directly in each fetch call inside the components. If you deploy this app or change the API port, you'll need to update these URLs (or better, move them into an environment variable, e.g. `VITE_API_URL`).
- Tailwind CSS must be installed and configured (`tailwind.config.js`, `postcss.config.js`, and the Tailwind directives in your main CSS file) for the styling classes used in the components to take effect.

---

## ⚠️ Known Limitations

This project is intended as a **learning/demo project**, not a production-ready application. A few important caveats:

- **Passwords are stored and compared in plain text.** JSON Server has no built-in password hashing or encryption. Never use this pattern with real user data.
- **No real authentication/session tokens.** The "logged-in" state is just a plain object saved in `localStorage`, which can be read or edited by anyone with access to the browser's dev tools.
- **No server-side authorization.** The todos are filtered on the client side after fetching *all* todos — any user could technically see all data via the raw `/todos` endpoint.
- **JSON Server is a mock API.** It's meant for prototyping only and shouldn't be used as a real backend.

---

## 🔮 Future Improvements

- Replace JSON Server with a real backend (Node/Express, Django, etc.) and a proper database.
- Hash passwords (e.g., with bcrypt) and use real authentication (JWT/session-based).
- Filter todos server-side by authenticated user instead of on the client.
- Move API URLs into environment variables.
- Add loading and error states for network requests.
- Replace `prompt()`/`alert()` with proper modal components for a better UX.
- Add unit and integration tests.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

### 🙌 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](../../issues) or open a pull request.
