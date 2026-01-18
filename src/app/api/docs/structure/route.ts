import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Fetch all published docs and their folders
        const folders = await prisma.docFolder.findMany({
            orderBy: {
                order: 'asc',
            },
            include: {
                docs: {
                    where: {
                        published: true,
                    },
                    orderBy: {
                        order: 'asc',
                    },
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                        order: true,
                    },
                },
            },
        });

        // Organize into a tree structure
        // 1. Map all folders by ID
        const folderMap = new Map<string, any>();
        folders.forEach((f: any) => {
            folderMap.set(f.id, {
                ...f,
                children: [],
                docs: f.docs,
            });
        });

        // 2. Build the tree
        const structure: any[] = [];
        folderMap.forEach((f) => {
            if (f.parentId) {
                const parent = folderMap.get(f.parentId);
                if (parent) {
                    parent.children.push(f);
                } else {
                    structure.push(f);
                }
            } else {
                structure.push(f);
            }
        });

        // 3. Sort root level
        structure.sort((a, b) => a.order - b.order);

        return NextResponse.json(structure);
    } catch (error) {
        console.error("Failed to fetch doc structure:", error);
        return NextResponse.json({ error: "Failed to fetch doc structure" }, { status: 500 });
    }
}
