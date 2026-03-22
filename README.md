# ALPHA Plumbing n Electrical Ltd

This is a professional Next.js 15 e-commerce application for Alpha Electricals & Plumbing Ltd, built with a modern stack featuring React, ShadCN UI, Tailwind, and Firebase.

## Technology Stack

### Frontend
- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Library**: [React 18](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [ShadCN UI](https://ui.shadcn.com/) / [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)

### Backend & AI
- **Database**: [Cloud Firestore](https://firebase.google.com/docs/firestore)
- **Auth**: [Firebase Authentication](https://firebase.google.com/docs/auth)
- **Storage**: [Firebase Storage](https://firebase.google.com/docs/storage)
- **AI Framework**: [Firebase Genkit](https://firebase.google.com/docs/genkit)
- **AI Models**: Google Gemini (via Genkit)

## Project Identity & URLs

Your project is identified by its **Firebase Project ID**. By default, your app will be accessible at:
- `https://alpha-plumbing-electrical.web.app`
- `https://alpha-plumbing-electrical.firebaseapp.com`

The site name is configured in the `site` property within `firebase.json`.

## Hosting & Deployment (Firebase)

To host this project online:

1. **Install Firebase CLI**: `npm install -g firebase-tools`
2. **Login**: `firebase login`
3. **Initialize Hosting**: `firebase init hosting` (Choose 'Next.js' when prompted)
4. **Deploy**: `firebase deploy`

## Pushing to GitHub/GitLab

To push your code to a remote repository:

1. `git init`
2. `git add .`
3. `git commit -m "Initial commit"`
4. `git branch -M main`
5. `git remote add origin YOUR_REPO_URL`
6. `git push -u origin main`

### Troubleshooting: Error GH007 (Private Email)
If you get an error saying "Your push would publish a private email address", it means your GitHub settings are blocking commits that reveal your email.

**Fix 1: Use GitHub's No-Reply Email**
1. Find your no-reply email in [GitHub Email Settings](https://github.com/settings/emails) (e.g., `ID+username@users.noreply.github.com`).
2. Run:
```bash
git config --global user.email "YOUR_NOREPLY_EMAIL"
git commit --amend --reset-author --no-edit
git push
```

**Fix 2: Disable the block**
1. Go to [GitHub Email Settings](https://github.com/settings/emails).
2. Uncheck **"Block command line pushes that expose my email"**.

## Key Features
- **Visual Search**: Users can capture images via camera to search/upload as "UserSelfies".
- **Admin Dashboard**: Secure panel for managing products, transactions, and viewing user-captured images.
- **AI Integration**: Genkit-powered chatbot ("Alpha AI") and automated product description generation.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.
- **Real-time Updates**: Product and selfie data syncs instantly via Firestore listeners.
