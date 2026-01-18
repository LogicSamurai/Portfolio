import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    const blogs = await prisma.blogPost.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
        take: 20,
    });

    const baseUrl = 'https://syntaxsamurai.com';

    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>SyntaxSamurai Blog</title>
  <link>${baseUrl}/blog</link>
  <description>Latest insights on modern web development and architecture from SyntaxSamurai.</description>
  <language>en-us</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${baseUrl}/api/rss" rel="self" type="application/rss+xml" />
  ${blogs
            .map(
                (post: { title: string; slug: string; excerpt: string | null; createdAt: Date }) => `
    <item>
      <title>${post.title}</title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <description>${post.excerpt || ''}</description>
      <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
      <guid>${baseUrl}/blog/${post.slug}</guid>
    </item>`
            )
            .join('')}
</channel>
</rss>`;

    return new NextResponse(rss, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 's-maxage=3600, stale-while-revalidate',
        },
    });
}
