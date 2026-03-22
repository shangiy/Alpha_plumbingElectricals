# ALPHA Plumbing n Electrical Ltd

This is a NextJS e-commerce application for Alpha Electricals & Plumbing Ltd, built with React, ShadCN UI, Tailwind, and Firebase.

## Technology Stack

### Frontend
- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
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

## Features
- **Visual Search**: Users can capture images via camera to search/upload as "UserSelfies".
- **Admin Dashboard**: Secure panel for managing products, transactions, and viewing user-captured images.
- **AI Integration**: Genkit-powered chatbot and product recommendations.
- **Analytics**: Vercel Analytics integrated for visitor tracking.
