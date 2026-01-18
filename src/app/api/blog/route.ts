import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/blog - Get all published blog posts (public)
export async function GET() {
    try {
        const posts = await prisma.blogPost.findMany({
            where: { published: true },
            orderBy: { createdAt: 'desc' },
            include: {
                author: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        return NextResponse.json(posts);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
