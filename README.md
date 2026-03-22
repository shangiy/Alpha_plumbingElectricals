
# ALPHA Plumbing n Electrical Ltd

This is a professional Next.js 15 e-commerce application for Alpha Electricals & Plumbing Ltd, built with a modern stack featuring React, ShadCN UI, Tailwind, and Firebase.

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS / ShadCN UI
- **Backend**: Firebase (Auth, Firestore, Storage)
- **AI**: Firebase Genkit + Google Gemini

## 🚀 Vercel Deployment Checklist (CRITICAL)

Your build is currently failing because Vercel does not have your Firebase keys. Follow these steps to fix it:

### Step 1: Get your keys from Firebase
1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Select your project: **alpha-plumbing-electrical**.
3.  Click the **Gear Icon (⚙️)** next to "Project Overview" and select **Project settings**.
4.  Scroll down to the "Your apps" section. Under "Web apps", you will see your `firebaseConfig` object.

### Step 2: Add keys to Vercel
1.  Open your project on the [Vercel Dashboard](https://vercel.com/dashboard).
2.  Navigate to **Settings** > **Environment Variables**.
3.  Add the following keys exactly as named below (copy the values from your Firebase settings):
    - `NEXT_PUBLIC_FIREBASE_API_KEY`
    - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
    - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
    - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
    - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
    - `NEXT_PUBLIC_FIREBASE_APP_ID`
4.  **Redeploy** the latest commit from the "Deployments" tab.

## Troubleshooting

### GH007: Private Email Error
If GitHub blocks your push:
1. Find your no-reply email in [GitHub Settings](https://github.com/settings/emails).
2. Run:
   ```bash
   git config --global user.email "your-id+username@users.noreply.github.com"
   git commit --amend --reset-author --no-edit
   git push
   ```

### Build Stuck?
The "Creating an optimized production build" step usually takes 1-3 minutes. If it crashes with "invalid-api-key", verify your Vercel Environment Variables matches your Firebase Console settings exactly.
