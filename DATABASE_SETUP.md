# Database Setup Guide

## Option 1: Automated Setup (Recommended)

Run the setup script:
```bash
./setup-db.sh
```

This will:
- Start PostgreSQL
- Create database `portfolio`
- Create user `portfolio_user`
- Update `.env` and `prisma.config.ts`
- Run migrations
- Create admin user

## Option 2: Manual Setup

### 1. Start PostgreSQL
```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql  # Start on boot
```

### 2. Create Database and User
```bash
sudo -u postgres psql
```

Then in PostgreSQL:
```sql
CREATE USER portfolio_user WITH PASSWORD 'portfolio_password';
CREATE DATABASE portfolio OWNER portfolio_user;
GRANT ALL PRIVILEGES ON DATABASE portfolio TO portfolio_user;
\c portfolio
GRANT ALL ON SCHEMA public TO portfolio_user;
\q
```

### 3. Update Configuration Files

**`.env`**:
```env
DATABASE_URL="postgresql://portfolio_user:portfolio_password@127.0.0.1:5433/portfolio?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="change-this-secret"
```

**`prisma.config.ts`**:
```typescript
datasource: {
  url: "postgresql://portfolio_user:portfolio_password@127.0.0.1:5433/portfolio?schema=public",
}
```

### 4. Run Migrations
```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Create Admin User (Automatic steps handled)
The admin user `admin@example.com` has already been created. 

## Verify Setup

```bash
# Check PostgreSQL is running
pg_lsclusters

# Test database connection
psql -h 127.0.0.1 -p 5433 -U portfolio_user -d portfolio -c "SELECT version();"
```

## Default Credentials

**Database:**
- User: `portfolio_user`
- Password: `portfolio_password`
- Database: `portfolio`
- Port: `5433` (Local Postgres 18)

**Admin:**
- Email: `admin@example.com`
- Password: `admin123`

⚠️ **Change these in production!**
