import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
    const connectionString = process.env.DATABASE_URL;
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    const prismaClient = new PrismaClient({ adapter });

    try {
        const admin = await prismaClient.user.findFirst({
            where: { role: 'admin' }
        });

        if (!admin) {
            console.error("Admin user not found.");
            return;
        }

        const projectContent = `
# The Vision
Building a portfolio that doesn't just list skills, but tells a story through design and code.

## Key Features
- **Neo-noir Aesthetic**: Pure black backgrounds with high-contrast lime accents.
- **Hierarchical Docs**: Organised knowledge base for technical deep-dives.
- **MDX Support**: Rich content rendering for both blog posts and case studies.

## Technical Stack
This project utilizes **Next.js 15**, **Prisma 7**, and **Tailwind CSS** for a bleeding-edge developer experience.
`;

        await prismaClient.project.upsert({
            where: { slug: 'neo-noir-portfolio' },
            update: { content: projectContent, published: true },
            create: {
                title: 'Neo-Noir Portfolio',
                slug: 'neo-noir-portfolio',
                description: 'A premium, high-performance developer portfolio with a custom CMS and technical manual.',
                content: projectContent,
                technologies: ['Next.js', 'Prisma', 'Tailwind', 'MDX'],
                category: 'Web App',
                featured: true,
                published: true,
                githubUrl: 'https://github.com/SyntaxSamurai/portfolio',
                authorId: admin.id,
            }
        });

        console.log("Project seed data created successfully!");
    } catch (error) {
        console.error("Seed failed:", error);
    } finally {
        await prismaClient.$disconnect();
        await pool.end();
    }
}

main();
