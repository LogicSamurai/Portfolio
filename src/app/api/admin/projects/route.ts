import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// POST /api/admin/projects - Create a new project
export async function POST(request: Request) {
    const session = await auth();

    if (!session || session.user.role !== 'admin') {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const {
            title,
            slug,
            description,
            content,
            technologies,
            category,
            featured,
            published,
            githubUrl,
            liveUrl,
            imageUrl,
            order
        } = body;

        // Validation
        if (!title || !slug || !category) {
            return NextResponse.json({ error: "Title, slug, and category are required" }, { status: 400 });
        }

        // Check for unique slug
        const existing = await prisma.project.findUnique({
            where: { slug }
        });

        if (existing) {
            return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
        }

        const project = await prisma.project.create({
            data: {
                title,
                slug,
                description,
                content: content || "",
                technologies: technologies || [],
                category,
                featured: featured || false,
                published: published || false,
                githubUrl,
                liveUrl,
                imageUrl,
                order: order || 0,
                authorId: session.user.id,
            },
        });

        return NextResponse.json(project);
    } catch (error) {
        console.error("Failed to create project:", error);
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
    }
}

// GET /api/admin/projects - List all projects (for admin)
export async function GET() {
    const session = await auth();

    if (!session || session.user.role !== 'admin') {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const projects = await prisma.project.findMany({
            orderBy: {
                order: 'asc',
            },
        });

        return NextResponse.json(projects);
    } catch (error) {
        console.error("Failed to fetch projects:", error);
        return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
    }
}
