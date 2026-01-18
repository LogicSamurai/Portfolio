import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    const { id } = await params;

    if (!session || session.user.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const data = await req.json();
        const { title, slug, description, content, published, tags, readingTime } = data;

        // Check if slug is unique (excluding current post)
        if (slug) {
            const existingPost = await prisma.blogPost.findFirst({
                where: {
                    slug,
                    NOT: { id },
                },
            });

            if (existingPost) {
                return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
            }
        }

        const post = await prisma.blogPost.update({
            where: { id },
            data: {
                title,
                slug,
                description,
                content,
                published,
                tags,
                readingTime,
            },
        });

        return NextResponse.json(post);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    const { id } = await params;

    if (!session || session.user.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        await prisma.blogPost.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Post deleted' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
