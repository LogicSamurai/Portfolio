import { PrismaClient } from '@prisma/client';
import { serialize } from 'next-mdx-remote/serialize';

const prisma = new PrismaClient();

async function checkMDX(source: string, identifier: string) {
    try {
        await serialize(source);
        return true;
    } catch (error: any) {
        console.error(`❌ MDX Error in ${identifier}:`);
        console.error(error.message);
        console.error('--- Content Snippet ---');
        console.error(source.slice(0, 200));
        console.error('--- End Snippet ---\n');
        return false;
    }
}

async function main() {
    console.log('🔍 Diagnosing MDX content in database...\n');

    const blogs = await prisma.blogPost.findMany();
    const docs = await prisma.doc.findMany();
    const projects = await prisma.project.findMany();

    let errors = 0;

    for (const blog of blogs) {
        if (!(await checkMDX(blog.content, `Blog: ${blog.slug}`))) errors++;
    }

    for (const doc of docs) {
        if (!(await checkMDX(doc.content, `Doc: ${doc.slug}`))) errors++;
    }

    for (const project of projects) {
        if (project.content && !(await checkMDX(project.content, `Project: ${project.slug}`))) errors++;
    }

    if (errors === 0) {
        console.log('✅ No MDX errors found in database content.');
    } else {
        console.log(`\n🚨 Found ${errors} MDX content errors.`);
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
