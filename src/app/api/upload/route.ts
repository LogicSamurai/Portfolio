import { auth } from "@/lib/auth";
import { saveUploadedFile } from "@/lib/imageUtils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const session = await auth();

    if (!session || session.user.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const folder = (formData.get('folder') as string) || 'general';

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const url = await saveUploadedFile(file, folder);

        return NextResponse.json({ url });
    } catch (error: any) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
