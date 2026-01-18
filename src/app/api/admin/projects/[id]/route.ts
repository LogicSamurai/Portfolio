import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// PATCH /api/admin/projects/[id] - Update a project
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    const { id } = await params;

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

        // Verify project exists
        const existing = await prisma.project.findUnique({
            where: { id }
        });

        if (!existing) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        // Check for slug uniqueness if it's changing
        if (slug && slug !== existing.slug) {
            const duplicate = await prisma.project.findUnique({
                where: { slug }
            });

            if (duplicate) {
                return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
            }
        }

        const project = await prisma.project.update({
            where: { id },
            data: {
                title: title ?? undefined,
                slug: slug ?? undefined,
                description: description ?? undefined,
                content: content ?? undefined,
                technologies: technologies ?? undefined,
                category: category ?? undefined,
                featured: featured !== undefined ? featured : undefined,
                published: published !== undefined ? published : undefined,
                githubUrl: githubUrl ?? undefined,
                liveUrl: liveUrl ?? undefined,
                imageUrl: imageUrl ?? undefined,
                order: order ?? undefined,
            },
        });

        return NextResponse.json(project);
    } catch (error) {
        console.error("Failed to update project:", error);
        return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
    }
}

// DELETE /api/admin/projects/[id] - Delete a project
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    const { id } = await params;

    if (!session || session.user.role !== 'admin') {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await prisma.project.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Project deleted successfully" });
    } catch (error) {
        console.error("Failed to delete project:", error);
        return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
    }
}
