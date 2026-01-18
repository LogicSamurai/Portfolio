# Quick Start Guide

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create `.env` file:
```env
DATABASE_URL="postgresql://portfolio_user:portfolio_password@127.0.0.1:5433/portfolio?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
```

### 3. Set Up Database
```bash
# Generate Prisma client
npx prisma generate

# Run migrations (creates tables)
npx prisma migrate dev --name init
```

### 4. Create Admin User
```bash
npm run create-admin
```
Default: `admin@example.com` / `admin123`

### 5. Start Development Server
```bash
npm run dev
```

Visit: http://localhost:3000

## 📍 Available Routes

- **Homepage**: `/` - Hero section
- **Blog**: `/blog` - All blog posts
- **Blog Post**: `/blog/[slug]` - Individual post
- **Login**: `/login` - Admin login
- **Admin Dashboard**: `/admin` - Content management (protected)

## 🔑 Admin Access

1. Go to http://localhost:3000/login
2. Login with admin credentials
3. Access dashboard at http://localhost:3000/admin

## 🎨 Features Implemented

✅ Authentication (NextAuth.js v5)
✅ Blog system with MDX
✅ Search & tag filtering
✅ Dark/light mode
✅ Responsive design
✅ Admin dashboard

## 🚧 Coming Next

- Blog admin interface (create/edit posts)
- Documentation system
- DSA problem component
- Projects showcase
- About page

## 📝 Notes

- **Prisma 7**: Database URL is in `prisma.config.ts`, not schema file
- **Dev Server**: Runs on port 3000
- **Database**: PostgreSQL required (local or cloud)
