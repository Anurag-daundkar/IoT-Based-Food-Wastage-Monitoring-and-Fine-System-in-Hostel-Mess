
# Smart Sentinel Frontend

## Authentication

This app uses JWT authentication with a Node.js/Express backend and MongoDB. Login is available for both Admin and Student roles.

- **Login:**
	- Admin: `/AdminLogin`
	- Student: `/StudentLogin`
- **Protected Routes:**
	- `/Admin/*` (admin only)
	- `/Student/*` (student only)
- **Logout:**
	- Use the sidebar logout button to clear your session.

### How it works

1. User logs in with email and password. The backend returns a JWT and user info (including role).
2. The JWT is stored in localStorage. AuthContext manages authentication state.
3. ProtectedRoute ensures only authenticated users with the correct role can access dashboard routes.
4. Logout clears the JWT and redirects to the landing page.

### Backend API

- Login endpoint: `POST http://localhost:5000/api/auth/login`
	- Request: `{ email, password }`
	- Response: `{ token, user: { role, ... } }`

> Update the API URL in `AuthContext.jsx` if your backend runs elsewhere.

## Running the Frontend

1. Install dependencies:
	 ```sh
	 npm install
	 ```
2. Start the dev server:
	 ```sh
	 npm run dev
	 ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Running the Backend

1. Make sure your backend is running on `http://localhost:5000` and connected to MongoDB.
2. The backend should provide the `/api/auth/login` endpoint and return a JWT and user info.

---

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
