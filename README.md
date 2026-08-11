# Release Notes Generator — by Xavi Marín

Transform a list of sprint features and fixes into polished release notes for 3 audiences simultaneously: end users, technical teams, and executives.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Groq API (Llama 3.3)

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Deploy to Vercel
Add `GROQ_API_KEY` in Vercel Environment Variables, then `vercel deploy`.

## Part of PO Toolkit by Xavi Marín — xavimarin.net
