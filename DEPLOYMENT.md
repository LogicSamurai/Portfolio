# Deployment Guide - SyntaxSamurai Portfolio

This guide outlines the steps to deploy the SyntaxSamurai portfolio to a production environment.

## 🚀 Recommended Stack
- **Framework**: Next.js 16 (App Router)
- **Database**: PostgreSQL (Supabase, Vercel Postgres, or Railway)
- **hosting**: Vercel (Optimized for Next.js)
- **Auth**: NextAuth.js v5

## 🛠️ Environment Variables
Ensure all the following variables are set in your production environment:

```bash
# Database
DATABASE_URL="postgresql://user:password@host:port/dbname?sslmode=require"

# NextAuth
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-random-secret"

# GitHub OAuth (Optional, if using GitHub)
AUTH_GITHUB_ID="your-github-id"
AUTH_GITHUB_SECRET="your-github-secret"
```

## 📦 Deployment Steps

### 1. Database Migration
Run the Prisma migration to set up the production schema:
```bash
npx prisma migrate deploy
```

### 2. Create Admin User
Use the provided script to create your initial admin account:
```bash
npx tsx scripts/create-admin.ts
```

### 3. Build & Deploy
If using Vercel, simply push to your main branch. For manual builds:
```bash
npm run build
npm run start
```

## 📈 SEO & Performance
- **Sitemap**: Automatically generated at `/sitemap.xml`.
- **RSS**: Available at `/api/rss`.
- **Images**: Automatically optimized via `next/image`.
- **Metadata**: Managed via `src/lib/metadata.ts`.

## 🛡️ Security Check
- Ensure `NEXTAUTH_SECRET` is strong and secret.
- Admin routes are protected via `src/proxy.ts`.
- Database should only allow connections from your application IP.
