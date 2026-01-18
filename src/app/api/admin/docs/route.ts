import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/admin/docs - List all documentation pages
export async function GET() {
    const session = await auth();

    if (!session || session.user.role !== 'admin') {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const docs = await prisma.doc.findMany({
            orderBy: { order: 'asc' },
            include: {
                folder: {
                    select: {
                        name: true,
                        slug: true,
                    },
                },
            },
        });

        return NextResponse.json(docs);
    } catch (error) {
        console.error("Failed to fetch docs:", error);
        return NextResponse.json({ error: "Failed to fetch docs" }, { status: 500 });
    }
}

// POST /api/admin/docs - Create a new documentation page
export async function POST(request: Request) {
    const session = await auth();

    if (!session || session.user.role !== 'admin') {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { title, slug, description, content, published, order, folderId, tags } = body;

        if (!title || !slug || !content || !folderId) {
            return NextResponse.json({ error: "Title, slug, content, and folder are required" }, { status: 400 });
        }

        // Check for duplicate slug in the same folder
        const existingDoc = await prisma.doc.findFirst({
            where: {
                slug,
                folderId,
            },
        });

        if (existingDoc) {
            return NextResponse.json({ error: "A document with this slug already exists in this folder" }, { status: 400 });
        }

        const doc = await prisma.doc.create({
            data: {
                title,
                slug,
                description,
                content,
                published: published || false,
                order: order || 0,
                folderId,
                tags: tags || [],
                authorId: session.user.id,
            },
        });

        return NextResponse.json(doc);
    } catch (error) {
        console.error("Failed to create document:", error);
        return NextResponse.json({ error: "Failed to create document" }, { status: 500 });
    }
}
