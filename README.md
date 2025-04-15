## Simple SvelteKit App with Firebase Auth and Firestore for user data.

- Firebase authentication flow (sign-in, sign-up, password reset and email verification)
- Firestore user profile creation
- Protected page (for logged in users)
- Directory based routing
- Basic, responsive components and blocks (like a sidebar, modal, etc)
- TailwindCSS and semantic theme (automatic dark/light mode)

**Install with**
```
npm install
```

**Add your Firebase credentials to the .env file**

```
VITE_FIREBASE_API_KEY=YourKey
VITE_FIREBASE_AUTH_DOMAIN=YourDomain
VITE_FIREBASE_PROJECT_ID=YourProjectId
VITE_FIREBASE_STORAGE_BUCKET=YourBucket
VITE_FIREBASE_MESSAGING_SENDER_ID=YourSenderId
VITE_FIREBASE_APP_ID=YourAppId
VITE_FIREBASE_MEASUREMENT_ID=YourMeasurementId
```

**Run with**
```
npm run dev
```

**Customize theme**<br>
Go into tailwind.config.js and change the semantic theme colors.

**Deployment**<br>
Import repo in Vercel and deploy (use `dist` as build folder).