# QueueUp — Ticket Management App 🧾

A simple ticket management app built with a mock authentication API and a React frontend powered by Vite, JWT, TailwindCSS, Zod, React Router, and React Toast.

##📁 Project Structure

```
/
├── mock-auth-api       ← JSON Server + JWT mock backend
├── react                ← Frontend built with React & Vite
└── README.md            ← This file
```

## 🚀 Features

- JWT-based mock authentication (login, register)

- Dashboard: summary stats (total, open, resolved tickets) + navigation

- Ticket Management (CRUD)

- Create new tickets via form

- Read existing tickets in card-style layout with status tags

- Update existing tickets with validation

- Delete tickets with confirmation

- Clean layout centered ≤ 1440px

- TailwindCSS styling, form validation with Zod, toasts for user feedback

## 🛠️ Setup & Running Locally

Prerequisites

- Node.js (v16+ recommended)

- npm or yarn

### 1. Setup & run the mock-auth-api

```
cd mock-auth-api
npm install
# or `yarn install`

# Start the mock API
npm run serve
# or `yarn serve`
```

This runs the JSON Server with JWT support (you’ll see endpoints like /login, /register, /tickets, etc.)

### 2. Setup & run the React frontend

Open a new terminal tab/window:

```
cd react
npm install
# or `yarn install`

npm run dev
# or `yarn dev`
```

This will start the Vite dev server (usually at http://localhost:5173 or similar).

Make sure the mock API is running concurrently so the front end can hit it.

## 👤 Test Credentials

You can use this test account to log in / try the app:

**Email**: `testuser@mail.com`

**Password:** `P@ssword123`

## 🧪 Tech Stack & Libraries

**Backend / Mock API:** JSON Server, JWT

**Frontend:**

- React + Vite

- TailwindCSS

- Zod (validation)

- React Router

- React Toast (for notifications)

## 🧠 Usage Notes & Tips

- On login, the frontend should store the JWT token (e.g. in localStorage) and use it for authenticated requests (e.g. creating/updating tickets).

- Use form-level validation (via Zod) so users see friendly errors before submission.

- UI layout should consistently be centered, with a max width of 1440px (for desktop).

- Use toast notifications for success / error feedback (ticket created, update failed, etc.).

## 📋 Next Steps & Enhancements (Ideas)

- Add role-based access (admin vs regular user)

- Add file attachments to tickets

- Add real backend (e.g. Express + DB)

- Add Dark Mode support

- Add user profile / settings page

## 📜 License & Credits

Credit to the original author (me 😄) and all open-source libraries used.
