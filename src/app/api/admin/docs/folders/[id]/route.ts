import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// PATCH /api/admin/docs/folders/[id] - Update a folder
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
        const { name, slug, description, parentId, order } = body;

        // Verify folder exists
        const existingFolder = await prisma.docFolder.findUnique({
            where: { id },
        });

        if (!existingFolder) {
            return NextResponse.json({ error: "Folder not found" }, { status: 404 });
        }

        // If slug or parentId is being updated, check for duplicates
        if (slug || parentId !== undefined) {
            const finalSlug = slug || existingFolder.slug;
            const finalParentId = parentId !== undefined ? parentId : existingFolder.parentId;

            const duplicate = await prisma.docFolder.findFirst({
                where: {
                    id: { not: id },
                    slug: finalSlug,
                    parentId: finalParentId || null,
                },
            });

            if (duplicate) {
                return NextResponse.json({ error: "A folder with this slug already exists in this location" }, { status: 400 });
            }
        }

        const folder = await prisma.docFolder.update({
            where: { id },
            data: {
                name: name !== undefined ? name : undefined,
                slug: slug !== undefined ? slug : undefined,
                description: description !== undefined ? description : undefined,
                parentId: parentId !== undefined ? (parentId || null) : undefined,
                order: order !== undefined ? order : undefined,
            },
        });

        return NextResponse.json(folder);
    } catch (error) {
        console.error("Failed to update folder:", error);
        return NextResponse.json({ error: "Failed to update folder" }, { status: 500 });
    }
}

// DELETE /api/admin/docs/folders/[id] - Delete a folder
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
        // Note: Prisma schema has onDelete: Cascade for children and docs
        await prisma.docFolder.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Folder deleted successfully" });
    } catch (error) {
        console.error("Failed to delete folder:", error);
        return NextResponse.json({ error: "Failed to delete folder" }, { status: 500 });
    }
}
