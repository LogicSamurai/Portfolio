const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const docs = await prisma.doc.findMany({ select: { slug: true, content: true } });
    const projects = await prisma.project.findMany({ select: { slug: true, content: true } });
    const blogs = await prisma.blogPost.findMany({ select: { slug: true, content: true } });

    console.log('--- DOCS ---');
    docs.forEach(d => {
        console.log(`SLUG: ${d.slug}`);
        console.log(`CONTENT_LENGTH: ${d.content.length}`);
        console.log(`LAST_CHAR: "${d.content.slice(-1)}"`);
        console.log(`CONTENT: \n${d.content}\n---`);
    });

    console.log('--- PROJECTS ---');
    projects.forEach(p => {
        console.log(`SLUG: ${p.slug}`);
        console.log(`CONTENT_LENGTH: ${p.content?.length || 0}`);
        console.log(`LAST_CHAR: "${p.content?.slice(-1) || 'N/A'}"`);
        console.log(`CONTENT: \n${p.content}\n---`);
    });
}

main().catch(console.error).finally(() => prisma.$disconnect());
