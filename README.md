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

## Hosting & Deployment

### Option 1: Firebase Hosting (Recommended)
To host this project on Firebase:
1. **Install Firebase CLI**: `npm install -g firebase-tools`
2. **Login**: `firebase login`
3. **Initialize**: `firebase init hosting` (Detects Next.js automatically)
4. **Deploy**: `firebase deploy`

### Option 2: Vercel Deployment
To host this project on Vercel:
1. Push your code to GitHub.
2. Import the repository in the [Vercel Dashboard](https://vercel.com/new).
3. **Crucial**: Add your Environment Variables (found in `.env`) to the Vercel Project Settings.
4. Vercel will automatically build and deploy your app.

## Troubleshooting: Git Push Error (GH007)
If you get an error saying "Your push would publish a private email address":

1. **Find your No-Reply Email**: Go to [GitHub Email Settings](https://github.com/settings/emails) and look for your `@users.noreply.github.com` address.
2. **Update your local config**:
```bash
git config --global user.email "YOUR_NOREPLY_EMAIL_HERE"
```
3. **Fix the commit and push**:
```bash
git commit --amend --reset-author --no-edit
git push
```

## Key Features
- **Visual Search**: Users can capture images via camera to search/upload as "UserSelfies".
- **Admin Dashboard**: Secure panel for managing products, transactions, and viewing user-captured images.
- **AI Integration**: Genkit-powered chatbot ("Alpha AI") and automated product description generation.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.
- **Real-time Updates**: Product and selfie data syncs instantly via Firestore listeners.
