import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error('DATABASE_URL is not set in environment');
    process.exit(1);
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    const email = process.env.ADMIN_EMAIL || 'admin@example.com';
    const password = process.env.ADMIN_PASSWORD || 'admin123';
    const name = process.env.ADMIN_NAME || 'Admin';

    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
        where: { email },
    });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    if (existingAdmin) {
        console.log('Admin user exists. Updating password...');
        await prisma.user.update({
            where: { email },
            data: { password: hashedPassword },
        });
        console.log('Password updated successfully.');
        return;
    }

    // Create admin user
    const admin = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
            role: 'admin',
        },
    });

    console.log('Admin user created successfully:');
    console.log(`Email: ${admin.email}`);
    console.log(`Password: ${password}`);
    console.log('\n⚠️  Please change the password after first login!');
}

main()
    .catch((e: unknown) => {
        if (e instanceof Error) {
            console.error('Error creating admin user:', e.message);
        } else {
            console.error('Error creating admin user:', String(e));
        }
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
    });
