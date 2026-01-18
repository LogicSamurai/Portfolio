import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import DocForm from "@/components/admin/DocForm";

interface EditDocPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditDocPage({ params }: EditDocPageProps) {
    const session = await auth();
    const { id } = await params;

    if (!session || session.user.role !== 'admin') {
        redirect("/login");
    }

    const doc = await prisma.doc.findUnique({
        where: { id },
    });

    if (!doc) {
        notFound();
    }

    const folders = await prisma.docFolder.findMany({
        orderBy: {
            name: 'asc',
        },
    });

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold font-display mb-2">Edit Doc</h1>
                <p className="text-muted">Update your documentation content.</p>
            </div>

            <DocForm initialData={doc} isEditing={true} folders={folders} />
        </div>
    );
}
