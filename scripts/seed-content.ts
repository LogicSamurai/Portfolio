import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
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
    console.log('🌱 Seeding database with sample content...\n');

    // Get admin user
    const admin = await prisma.user.findFirst({
        where: { role: 'admin' },
    });

    if (!admin) {
        console.error('❌ No admin user found. Please run create-admin.ts first.');
        process.exit(1);
    }

    // Create a root folder for docs
    let rootFolder = await prisma.docFolder.findFirst({
        where: {
            slug: 'getting-started',
            parentId: null,
        },
    });

    if (!rootFolder) {
        rootFolder = await prisma.docFolder.create({
            data: {
                name: 'Getting Started',
                slug: 'getting-started',
                description: 'Introduction to the documentation',
                order: 0,
            },
        });
        console.log('✅ Created doc folder:', rootFolder.name);
    } else {
        console.log('ℹ️  Doc folder already exists:', rootFolder.name);
    }

    // Create a sample blog post
    let blogPost = await prisma.blogPost.findUnique({
        where: { slug: 'welcome-to-my-portfolio' },
    });

    if (!blogPost) {
        blogPost = await prisma.blogPost.create({
            data: {
                title: 'Welcome to My Portfolio',
                slug: 'welcome-to-my-portfolio',
                description: 'An introduction to my work and this portfolio website.',
                content: `# Welcome!

This is my portfolio website built with Next.js 16, Prisma, and PostgreSQL.

## Features

- 🎨 Modern Neo-Noir design
- 📝 MDX-powered blog and documentation
- 🚀 High-performance architecture
- 🔒 Secure admin dashboard

## Tech Stack

- **Frontend**: Next.js 16, React, Tailwind CSS v4
- **Backend**: Prisma ORM, PostgreSQL
- **Auth**: NextAuth.js v5
- **Deployment**: Vercel

Stay tuned for more posts!`,
                published: true,
                tags: ['announcement', 'portfolio', 'nextjs'],
                readingTime: 2,
                authorId: admin.id,
            },
        });
        console.log('✅ Created blog post:', blogPost.title);
    } else {
        console.log('ℹ️  Blog post already exists:', blogPost.title);
    }

    // Create a sample project
    let project = await prisma.project.findUnique({
        where: { slug: 'portfolio-website' },
    });

    if (!project) {
        project = await prisma.project.create({
            data: {
                title: 'Portfolio Website 2026',
                slug: 'portfolio-website',
                description: 'A modern, high-performance portfolio built with cutting-edge technologies.',
                content: `# Portfolio Website

This portfolio showcases my work and technical expertise through a premium, Neo-Noir design aesthetic.

## Key Features

- **Dynamic Content Management**: Full-featured admin dashboard
- **MDX Support**: Rich content with custom components
- **Performance**: Optimized for Core Web Vitals
- **SEO**: Automated sitemap and RSS feed generation

## Technical Highlights

- Server-side rendering with Next.js 16
- Type-safe database queries with Prisma
- Secure authentication with NextAuth.js
- Responsive design with Tailwind CSS v4`,
                technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
                category: 'Web Development',
                featured: true,
                published: true,
                githubUrl: 'https://github.com/syntaxsamurai/portfolio',
                liveUrl: 'https://syntaxsamurai.com',
                order: 1,
                authorId: admin.id,
            },
        });
        console.log('✅ Created project:', project.title);
    } else {
        console.log('ℹ️  Project already exists:', project.title);
    }

    // Create a sample doc
    let doc = await prisma.doc.findFirst({
        where: {
            slug: 'introduction',
            folderId: rootFolder.id,
        },
    });

    if (!doc) {
        doc = await prisma.doc.create({
            data: {
                title: 'Introduction',
                slug: 'introduction',
                description: 'Getting started with the documentation',
                content: `# Introduction

Welcome to the documentation section!

## What You'll Find Here

This documentation covers various topics including:

- Data Structures & Algorithms
- System Design Patterns
- Best Practices
- Code Examples

## Navigation

Use the sidebar to browse through different topics and sections.`,
                published: true,
                order: 0,
                folderId: rootFolder.id,
                tags: ['intro', 'getting-started'],
                authorId: admin.id,
            },
        });
        console.log('✅ Created doc:', doc.title);
    } else {
        console.log('ℹ️  Doc already exists:', doc.title);
    }

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - 1 blog post`);
    console.log(`   - 1 project`);
    console.log(`   - 1 documentation page`);
    console.log(`   - 1 documentation folder`);
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
    });
