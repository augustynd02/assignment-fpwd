## Setup

From the project root:

```bash
npm run init
```

This installs dependencies in the root, `backend`, and `frontend` folders.

## Running the app
**Set up environment variables:**

Backend: /backend/.env
```bash
PORT=8000
FRONTEND_URL=<YOUR_FRONTEND_URL>
API_URL=<EXTERNAL_EXCHANGE_RATE_API_URL>
API_KEY=<YOUR_SECURE_API_KEY>
```

Frontend: /frontend/.env.local
```bash
NEXT_PUBLIC_API_URL=<YOUR_BACKEND_API_URL>
```

Run the app:
```bash
npm run dev
```

Starts the backend on `http://localhost:8000` and the frontend on `http://localhost:3000`.

## Running tests

```bash
npm test
```

Runs the backend and frontend tests.
