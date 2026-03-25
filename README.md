
# ALPHA Plumbing n Electrical Ltd

This is a professional Next.js 15 e-commerce application for Alpha Electricals & Plumbing Ltd, built with a modern stack featuring React, ShadCN UI, Tailwind, and Firebase.

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS / ShadCN UI
- **Backend**: Firebase (Auth, Firestore, Storage)
- **AI**: Firebase Genkit + Google Gemini

## 🚀 Vercel Deployment Checklist (CRITICAL)

Your build is failing because Vercel needs these specific keys. Follow these steps:

### Step 1: Add keys to Vercel
1.  Open your project on the [Vercel Dashboard](https://vercel.com/dashboard).
2.  Navigate to **Settings** > **Environment Variables**.
3.  Add the following 6 keys exactly as named below (use the values you found in your Firebase console):
    - `NEXT_PUBLIC_FIREBASE_API_KEY`
    - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
    - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
    - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
    - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
    - `NEXT_PUBLIC_FIREBASE_APP_ID`
4.  **Redeploy** the latest commit from the "Deployments" tab.

## Troubleshooting

### GitHub "Authentication failed" or "Missing credentials"
If the standard `git push` fails in this environment:
1. Generate a [Personal Access Token (classic)](https://github.com/settings/tokens) with `repo` scope.
2. Run this command to include your token in the URL:
   ```bash
   git remote set-url origin https://YOUR_USERNAME:YOUR_TOKEN@github.com/shangiy/Alpha_plumbingElectricals.git
   ```
3. Push your changes:
   ```bash
   git push origin main
   ```

### GH007: Private Email Error
If GitHub blocks your push:
1. Find your no-reply email in [GitHub Settings](https://github.com/settings/emails).
2. Run:
   ```bash
   git config --global user.email "your-id+username@users.noreply.github.com"
   git commit --amend --reset-author --no-edit
   git push origin main --force
   ```

### Firebase "auth/invalid-api-key"
This means Vercel is trying to build your pages but doesn't have the keys yet. Adding the Environment Variables in Vercel Settings fixes this immediately.
