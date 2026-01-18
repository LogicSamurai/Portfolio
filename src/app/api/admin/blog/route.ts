import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth();

    if (!session || session.user.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const posts = await prisma.blogPost.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });

        return NextResponse.json(posts);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await auth();

    if (!session || session.user.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const data = await req.json();
        const { title, slug, description, content, published, tags, readingTime } = data;

        // Check if slug is unique
        const existingPost = await prisma.blogPost.findUnique({
            where: { slug },
        });

        if (existingPost) {
            return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
        }

        const post = await prisma.blogPost.create({
            data: {
                title,
                slug,
                description,
                content,
                published,
                tags,
                readingTime,
                authorId: session.user.id,
            },
        });

        return NextResponse.json(post);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
