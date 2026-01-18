#!/bin/bash

echo "🔍 Database Diagnostic Tool"
echo "=========================="

echo "1. Checking if Postgres is listening on 5432..."
netstat -tuln | grep 5432

echo ""
echo "2. Checking Postgres version..."
psql --version

echo ""
echo "3. Checking User Roles and Attributes..."
sudo -u postgres psql -c "\du"

echo ""
echo "4. Checking Authentication Configuration (pg_hba.conf)..."
sudo -u postgres psql -c "SHOW hba_file;"
HBA_FILE=$(sudo -u postgres psql -t -P format=unaligned -c "SHOW hba_file;")
sudo cat "$HBA_FILE" | grep -v '^#' | grep -v '^$'

echo ""
echo "5. Checking Password Encryption Setting..."
sudo -u postgres psql -c "SHOW password_encryption;"

echo ""
echo "6. Testing local connection with portfolio_user (Socket)..."
PGPASSWORD='portfolio_password' psql -U portfolio_user -d portfolio -c "SELECT 1;"

echo ""
echo "7. Testing TCP connection with portfolio_user (127.0.0.1)..."
PGPASSWORD='portfolio_password' psql -h 127.0.0.1 -U portfolio_user -d portfolio -c "SELECT 1;"

echo ""
echo "8. Verifying database existence..."
sudo -u postgres psql -c "\l portfolio"
