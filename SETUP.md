# Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"
```

## Database Setup

1. Install PostgreSQL locally or use a cloud provider (Supabase, Neon, etc.)
2. Update the `DATABASE_URL` in both `.env` AND `prisma.config.ts`
3. Generate Prisma client: `npx prisma generate`
4. Run migrations: `npx prisma migrate dev --name init`

**Note**: Prisma 7 requires the database URL in `prisma.config.ts` instead of the schema file.

## Create Admin User

After setting up the database, create an admin user:

```bash
npm run create-admin
```

Default credentials:
- Email: admin@example.com
- Password: admin123

**⚠️ Change these credentials after first login!**

## NextAuth Secret

Generate a secure secret for production:
```bash
openssl rand -base64 32
```

Replace `NEXTAUTH_SECRET` in `.env` with the generated value.
