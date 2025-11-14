# SvelteKit Prototyper Blueprint

This document captures the structure and authentication mechanics of the current project so you can replicate them in future boilerplates (even when swapping out the UI kit).

## Repository Layout

- `config & tooling`
  - Root contains `svelte.config.js`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `eslint.config.js`, `jsconfig.json`, `package.json`, and `env.example`.
  - Keep `node_modules/`, `build/`, and `dist/` out of version control when cloning the blueprint.
- `src/`
  - `app.html`, global stylesheet (e.g., `app.css`), `hooks.server.js`
  - `lib/`: reusable modules
    - `components/blocks/auth`: auth forms (logic separated from visual kit)
    - `components/parts`: primitive UI elements (buttons, inputs, logo, etc.)
    - `firebase/`: Firebase client config (`firebase.js`) and auth helpers (`auth.js`)
    - `server/`: Firebase Admin SDK setup (`firebase-admin.js`)
    - `stores/`: global state (`userStore.js`, `uiStore.js`)
    - `styles/`: shared CSS modules for theme, interactions, and animations
    - `utils/`: helpers such as `bodyClassUpdater.js`
  - `routes/`
    - `+layout.svelte`: loads global styles and boots client auth listener
    - `+page.svelte`: marketing/landing page
    - `+error.svelte`: shared error state
    - `account/`, `login/`, `reset-password/`: public auth pages powered by `lib/components/blocks/auth/*`
    - `verify-email/`: gated route for unverified users
    - `app/`: authenticated application shell
      - `+layout.server.js`: server-side user profile load (Firestore)
      - `+layout.svelte`: applies body classes, renders sidebar/portals, syncs stores
      - `+page.svelte`: sample dashboard page reading `userProfile`
      - nested feature routes (`components/+page.svelte`, etc.)
    - `api/`
      - `auth/login/+server.js`: exchanges Firebase ID tokens for HttpOnly cookies and performs Firestore upserts
      - `auth/logout/+server.js`: clears the session cookie
      - `data/+server.js`: example protected API plus `dummy-data.json`
- `static/`: favicons, logos, background images.
- `dist/`: built component library (mirrors `lib/` but compiled); optional in new boilerplates.
- `build/`: production SvelteKit output (server/client bundles).

## Environment & Firebase Layers

```
env.example
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY=...
```

- `src/lib/firebase/firebase.js` initializes the client SDK using `import.meta.env` variables and exports the `app` instance.
- `src/lib/server/firebase-admin.js` initializes the Admin SDK with `$env/static/private`, exports `adminAuth` and `adminDb`, and guards against duplicate initialization.

## Global Styling & Utilities

- `src/app.css` (or another global stylesheet) imports Tailwind layers plus any project CSS from `lib/styles/` (theme, interactions, animations).
- Body classes `logged-in` and `lock-scroll` are manipulated via `bodyClassUpdater.js` to control scrolling when authenticated or when modals are open.
- `static/` assets (logos, hero images) are referenced directly from routes and components.

## Authentication Flow

### Client-Side (`lib/firebase/auth.js`)

- Functions: `register`, `login`, `loginWithGoogle`, `logout`, `ensureServerSession`, `sendVerificationEmail`, `resetPassword`, `initializeAuth`.
- Flow:
  1. User authenticates via Firebase client SDK (email/password or Google).
  2. Obtain ID token and `POST` to `/api/auth/login`.
  3. Server returns HttpOnly `session` cookie (5-day expiry).
  4. Redirect based on `emailVerified` (`/app` vs `/verify-email`).
  5. `ensureServerSession` refreshes cookies when needed (e.g., after verification).
  6. `initializeAuth` runs in `routes/+layout.svelte` to flip the `loading` store once Firebase resolves.

### Server Hooks (`src/hooks.server.js`)

- Runs on every request (excluding `/api`).
- Reads `session` cookie, verifies via `adminAuth.verifySessionCookie`, and attaches `event.locals.user`.
- Enforces centralized route guards:
  - Verified users redirected to `/app` if they hit public pages.
  - Unverified users forced to `/verify-email`.
  - Anonymous users allowed on `['/', '/login', '/account', '/reset-password']`; everything else redirects to `/login`.

### API Endpoints

- `routes/api/auth/login/+server.js`
  - Validates ID token, creates session cookie, and upserts Firestore `users/<uid>` with trusted data (first/last/email, timestamps).
- `routes/api/auth/logout/+server.js`
  - Deletes the session cookie (`cookies.delete('session', { path: '/' })`).

### Verification Page (`routes/verify-email/+page.svelte`)

- Displays verification instructions, resend button, and alternate email option.
- Polls Firebase every 4 seconds to detect `emailVerified` changes.
- Calls `ensureSession`, `invalidateAll`, and redirects to `/app` once verified.
- Provides `tryAnotherEmail` action that calls `logout('/account')`.

## Protected App Shell (`routes/app/*`)

- `+layout.server.js`
  - Uses `adminDb` to fetch or synthesize a `userProfile` record per session.
  - Returns `{ user: locals.user, userProfile }` for descendants.
- `+layout.svelte`
  - Imports `Sidebar`, `Portal`, and UI stores.
  - Adds/removes `logged-in` and `lock-scroll` classes via `bodyClassUpdater`.
  - Syncs `userProfile` writable store with server data.
  - Provides portal mount points (e.g., `example-modal`, `settings-modal`, `example-drawer`).
- `+page.svelte`
  - Demonstrates using `$userProfile` to greet the current user; serves as a template for future dashboard pages.

## Stores

- `src/lib/stores/userStore.js`
  - `loading`: boolean used by public pages to show spinners until Firebase initializes.
  - `userProfile`: object mirrored from server load, consumed throughout `/app`.
- `src/lib/stores/uiStore.js`
  - `lockScroll`: toggles global scrolling.
  - `viewSidebar`: responsive sidebar visibility.
  - `portals`: registry for portal targets.

## Auth UI Blocks (`lib/components/blocks/auth`)

- `EmailPasswordSignin.svelte`
  - Uses `$state` runes for form fields, shows errors, calls `login()`, and persists email to `localStorage`.
- `EmailPasswordSignup.svelte`
  - Handles registration, syncs profile data via `ensureServerSession`, and routes to `/verify-email`.
- `ContinueWithGoogle.svelte`
  - Triggers Google OAuth flow via `loginWithGoogle`.
- `ResetPassword.svelte`
  - Calls `sendPasswordResetEmail` and provides user feedback.
- `PasswordIndicator.svelte`
  - Computes password strength score.

Because these blocks only depend on the auth module and basic primitives (Button, Input, etc.), you can re-skin them by swapping the “parts” components without touching the auth logic.

## Public Routes

- Landing (`routes/+page.svelte`): marketing copy, CTA buttons linking to `/account` and `/login`, plus GitHub link.
- `routes/login/+page.svelte`: wraps `EmailPasswordSignin`, `ContinueWithGoogle`, and global `loading` spinner.
- `routes/account/+page.svelte`: wraps `EmailPasswordSignup`, Google button, and promotional image section.
- `routes/reset-password/+page.svelte`: uses `ResetPassword` block (structure mirrors other auth pages).
- These routes rely on the centralized hook to block access when already authenticated.

## Suggested Steps for a New Boilerplate

1. Copy the folder structure above into a fresh repo (or script it).
2. Duplicate `env.example` and fill in Firebase credentials.
3. Port `lib/firebase/*`, `lib/server/firebase-admin.js`, `hooks.server.js`, and `routes/api/auth/*` unchanged.
4. Recreate `lib/components/blocks/auth` while swapping out any UI primitives with your new component kit.
5. Keep the global stylesheet, `styles/`, and `bodyClassUpdater.js` to ensure scroll management works; update design tokens as needed.
6. Test the full auth lifecycle: register → verify → load `/app`, plus logout/login flows and Google OAuth.

