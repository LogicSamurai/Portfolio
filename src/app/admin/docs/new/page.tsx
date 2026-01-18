import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import DocForm from "@/components/admin/DocForm";

export default async function NewDocPage() {
    const session = await auth();

    if (!session || session.user.role !== 'admin') {
        redirect("/login");
    }

    const folders = await prisma.docFolder.findMany({
        orderBy: {
            name: 'asc',
        },
    });

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold font-display mb-2">Create Doc</h1>
                <p className="text-muted">Write new documentation for your technical manual.</p>
            </div>

            <DocForm folders={folders} />
        </div>
    );
}
