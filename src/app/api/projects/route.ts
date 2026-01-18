import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/projects - Get all published projects (public)
export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            where: { published: true },
            orderBy: { order: 'asc' },
        });

        return NextResponse.json(projects);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
