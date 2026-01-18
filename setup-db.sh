#!/bin/bash

echo "🔧 Portfolio Database Setup Script"
echo "=================================="
echo ""

# Check if PostgreSQL is running
echo "1. Checking PostgreSQL status..."
if sudo systemctl is-active --quiet postgresql; then
    echo "   ✅ PostgreSQL is running"
else
    echo "   ⚠️  PostgreSQL is not running"
    echo "   Starting PostgreSQL..."
    sudo systemctl start postgresql
    if [ $? -eq 0 ]; then
        echo "   ✅ PostgreSQL started successfully"
    else
        echo "   ❌ Failed to start PostgreSQL"
        exit 1
    fi
fi

echo ""
echo "2. Creating database and user..."

# Create database and user
sudo -u postgres psql << EOF
-- Create user if not exists
DO \$\$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_user WHERE usename = 'portfolio_user') THEN
        CREATE USER portfolio_user WITH PASSWORD 'portfolio_password';
    END IF;
END
\$\$;

-- Create database if not exists
SELECT 'CREATE DATABASE portfolio'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'portfolio')\gexec

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE portfolio TO portfolio_user;

-- Connect to portfolio database and grant schema privileges
\c portfolio
GRANT ALL ON SCHEMA public TO portfolio_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO portfolio_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO portfolio_user;

EOF

if [ $? -eq 0 ]; then
    echo "   ✅ Database 'portfolio' created successfully"
    echo "   ✅ User 'portfolio_user' created successfully"
else
    echo "   ❌ Failed to create database or user"
    exit 1
fi

echo ""
echo "3. Updating .env file..."

# Update .env file
cat > .env << 'EOF'
# Database
DATABASE_URL="postgresql://portfolio_user:portfolio_password@localhost:5432/portfolio?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="change-this-to-a-random-secret-in-production"
EOF

echo "   ✅ .env file updated"

echo ""
echo "4. Updating prisma.config.ts..."

# Update prisma.config.ts with the database URL
cat > prisma.config.ts << 'EOF'
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: "postgresql://portfolio_user:portfolio_password@localhost:5432/portfolio?schema=public",
  },
});
EOF

echo "   ✅ prisma.config.ts updated"

echo ""
echo "5. Running Prisma migrations..."
npx prisma generate
npx prisma migrate dev --name init

if [ $? -eq 0 ]; then
    echo "   ✅ Migrations completed successfully"
else
    echo "   ❌ Migration failed"
    exit 1
fi

echo ""
echo "6. Creating admin user..."
npm run create-admin

echo ""
echo "✅ Setup Complete!"
echo ""
echo "Database Details:"
echo "  - Database: portfolio"
echo "  - User: portfolio_user"
echo "  - Password: portfolio_password"
echo "  - Host: localhost:5432"
echo ""
echo "Admin Credentials:"
echo "  - Email: admin@example.com"
echo "  - Password: admin123"
echo ""
echo "⚠️  IMPORTANT: Change these credentials in production!"
echo ""
echo "Next steps:"
echo "  1. Run: npm run dev"
echo "  2. Visit: http://localhost:3000"
echo "  3. Login at: http://localhost:3000/login"
