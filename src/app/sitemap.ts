import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://syntaxsamurai.com';

    // Fetch dynamic routes from DB
    const [blogs, docs, projects] = await Promise.all([
        prisma.blogPost.findMany({ select: { slug: true, updatedAt: true } }),
        prisma.doc.findMany({ select: { slug: true, updatedAt: true } }),
        prisma.project.findMany({ select: { slug: true, updatedAt: true } }),
    ]);

    const blogUrls = blogs.map((post: { slug: string; updatedAt: Date }) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updatedAt,
    }));

    const docUrls = docs.map((doc: { slug: string; updatedAt: Date }) => ({
        url: `${baseUrl}/docs/${doc.slug}`,
        lastModified: doc.updatedAt,
    }));

    const projectUrls = projects.map((project: { slug: string; updatedAt: Date }) => ({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: project.updatedAt,
    }));

    const staticUrls = [
        '',
        '/about',
        '/blog',
        '/projects',
        '/docs',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
    }));

    return [...staticUrls, ...blogUrls, ...docUrls, ...projectUrls];
}
