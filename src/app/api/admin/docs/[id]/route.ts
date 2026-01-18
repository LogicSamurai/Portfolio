import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// PATCH /api/admin/docs/[id] - Update a documentation page
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
        const { title, slug, description, content, published, order, folderId, tags } = body;

        // Verify doc exists
        const existingDoc = await prisma.doc.findUnique({
            where: { id },
        });

        if (!existingDoc) {
            return NextResponse.json({ error: "Document not found" }, { status: 404 });
        }

        // If slug or folderId is being updated, check for duplicates
        if (slug || folderId !== undefined) {
            const finalSlug = slug || existingDoc.slug;
            const finalFolderId = folderId !== undefined ? folderId : existingDoc.folderId;

            const duplicate = await prisma.doc.findFirst({
                where: {
                    id: { not: id },
                    slug: finalSlug,
                    folderId: finalFolderId,
                },
            });

            if (duplicate) {
                return NextResponse.json({ error: "A document with this slug already exists in this folder" }, { status: 400 });
            }
        }

        const doc = await prisma.doc.update({
            where: { id },
            data: {
                title: title !== undefined ? title : undefined,
                slug: slug !== undefined ? slug : undefined,
                description: description !== undefined ? description : undefined,
                content: content !== undefined ? content : undefined,
                published: published !== undefined ? published : undefined,
                order: order !== undefined ? order : undefined,
                folderId: folderId !== undefined ? folderId : undefined,
                tags: tags !== undefined ? tags : undefined,
            },
        });

        return NextResponse.json(doc);
    } catch (error) {
        console.error("Failed to update document:", error);
        return NextResponse.json({ error: "Failed to update document" }, { status: 500 });
    }
}

// DELETE /api/admin/docs/[id] - Delete a documentation page
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
        await prisma.doc.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Document deleted successfully" });
    } catch (error) {
        console.error("Failed to delete document:", error);
        return NextResponse.json({ error: "Failed to delete document" }, { status: 500 });
    }
}
