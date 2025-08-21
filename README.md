## SvelteKit + Svelte 5 + Firebase boilerplate

Production‑ready starter with Firebase Authentication (email/password + Google), session cookies, route guards, and Firestore helpers. Ships with TailwindCSS, dark/light theme, and a small component library.

### Features
- **Auth**: sign up, login, logout, password reset, email verification
- **Secure sessions**: Firebase ID token → server session cookie
- **Route guards**: centralized in `src/hooks.server.js`
- **UI**: responsive components, sidebar, dialogs, inputs, etc.
- **Styling**: TailwindCSS with semantic theming and auto dark/light

## Quick start

```bash
git clone <this-repo>
cd svelte-boilerplate
npm install
cp env.example .env
# fill in all values in .env (see below)
npm run dev
```

Visit `http://localhost:5173`.

## Environment variables

Create a `.env` file (never commit it). Client‑side variables must be prefixed with `VITE_`.

### Required (client)
```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
# Optional but supported by the codebase
VITE_FIREBASE_MEASUREMENT_ID=
```

You can find these in Firebase Console → Project settings → Your apps → Web app.

### Required (server – Admin SDK)
These are used only on the server to verify tokens and create session cookies. Keep them secret.

```env
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
# If your private key contains newlines, either keep them as real newlines
# or escape them as \n (the code handles both):
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

The Admin credentials come from Firebase Console → Project settings → Service accounts → Generate new private key. Do not expose this key to the client.

## Scripts

```bash
npm run dev       # start dev server
npm run build     # production build
npm run preview   # preview production build locally
npm run lint      # check formatting and linting
npm run format    # format code with Prettier
```

## Authentication flow

- Client signs in with Firebase (`email/password` or `Google`).
- The client sends the Firebase ID token to `POST /api/auth/login`.
- Server verifies the ID token and sets a secure `session` cookie.
- `src/hooks.server.js` reads the cookie on every request and sets `event.locals.user`.
- Central route guards enforce access:
  - Verified signed‑in users can access `/app`; other paths redirect to `/app`.
  - Unverified signed‑in users are redirected to `/verify-email`.
  - Signed‑out users can access `/`, `/login`, `/account`, `/reset-password`; other paths redirect to `/login`.

Endpoints:
- `POST /api/auth/login` – creates the session cookie
- `POST /api/auth/logout` – clears the session cookie

## Pages of interest

- `/` landing
- `/login` – email/password and Google login
- `/verify-email` – prompt to verify address and resend link
- `/reset-password` – send reset email
- `/app` – protected area after verification

## Firestore helpers

Helpers in `src/lib/firebase/firestore.js` wrap common operations: `setDocument`, `getDocument`, `getCollection`, `updateDocument`, `deleteDocument`, `queryDocuments`. They use the client SDK and respect your Firestore security rules.

## Styling and components

- TailwindCSS with semantic theme variables. Update colors in `tailwind.config.js` and styles in `src/lib/styles/`.
- Reusable components under `src/lib/components/parts/` and `src/lib/components/blocks/`.

## Deployment

Works out of the box on platforms supported by `@sveltejs/adapter-auto` (Vercel, Netlify, Node, etc.).

1) Set all environment variables in your hosting provider (both `VITE_…` and server‑only `FIREBASE_…`).
2) Build and deploy normally. On Vercel, no special output folder is needed; the adapter handles it.

Cookie security is already configured to be `secure` in production.

## Troubleshooting

- "Admin SDK init failed": ensure `FIREBASE_PRIVATE_KEY` newlines are correct (see above).
- "Unauthorized" on protected routes: confirm the `session` cookie is set after login.
- Blank UI during load: check console for Firebase errors and verify client env vars.

## Tech stack

- SvelteKit 2, Svelte 5 (runes API)
- Firebase JS SDK + Firebase Admin SDK
- TailwindCSS
- Plain JavaScript (no TypeScript)