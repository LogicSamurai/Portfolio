import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/admin/docs/folders - List all folders
export async function GET() {
    const session = await auth();

    if (!session || session.user.role !== 'admin') {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const folders = await prisma.docFolder.findMany({
            orderBy: {
                order: 'asc',
            },
            include: {
                _count: {
                    select: {
                        docs: true,
                        children: true,
                    },
                },
            },
        });

        return NextResponse.json(folders);
    } catch (error) {
        console.error("Failed to fetch folders:", error);
        return NextResponse.json({ error: "Failed to fetch folders" }, { status: 500 });
    }
}

// POST /api/admin/docs/folders - Create a new folder
export async function POST(request: Request) {
    const session = await auth();

    if (!session || session.user.role !== 'admin') {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { name, slug, description, parentId, order } = body;

        if (!name || !slug) {
            return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
        }

        // Check for duplicate slug in the same parent
        const existingFolder = await prisma.docFolder.findFirst({
            where: {
                slug,
                parentId: parentId || null,
            },
        });

        if (existingFolder) {
            return NextResponse.json({ error: "A folder with this slug already exists in this location" }, { status: 400 });
        }

        const folder = await prisma.docFolder.create({
            data: {
                name,
                slug,
                description,
                parentId: parentId || null,
                order: order || 0,
            },
        });

        return NextResponse.json(folder);
    } catch (error) {
        console.error("Failed to create folder:", error);
        return NextResponse.json({ error: "Failed to create folder" }, { status: 500 });
    }
}
