import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const [blogs, projects, docs] = await Promise.all([
            prisma.blogPost.findMany({
                where: { published: true },
                select: { id: true, title: true, slug: true, tags: true },
                orderBy: { createdAt: 'desc' },
            }),
            prisma.project.findMany({
                where: { published: true },
                select: { id: true, title: true, slug: true, category: true },
                orderBy: { order: 'asc' },
            }),
            prisma.doc.findMany({
                where: { published: true },
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    folder: { select: { name: true } }
                },
                orderBy: { order: 'asc' },
            }),
        ]);

        const registry = [
            ...blogs.map(item => ({
                ...item,
                category: item.tags[0] || 'JOURNAL',
                type: 'BLOG',
                url: `/blog/${item.slug}`
            })),
            ...projects.map(item => ({
                ...item,
                type: 'PROJECT',
                url: `/projects/${item.slug}`
            })),
            ...docs.map(item => ({
                id: item.id,
                title: item.title,
                slug: item.slug,
                category: item.folder.name,
                type: 'DOC',
                url: `/docs/${item.slug}`
            })),
        ];

        return NextResponse.json(registry);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch system registry' }, { status: 500 });
    }
}
