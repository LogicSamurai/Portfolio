import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads');
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export async function saveUploadedFile(file: File, folder: string = 'general'): Promise<string> {
    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
        throw new Error('Invalid file type. Only JPG, PNG, WebP, and GIF are allowed.');
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
        throw new Error('File size exceeds 5MB limit.');
    }

    // Create upload directory if it doesn't exist
    const targetDir = join(UPLOAD_DIR, folder);
    if (!existsSync(targetDir)) {
        await mkdir(targetDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}-${sanitizedName}`;
    const filepath = join(targetDir, filename);

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // Return public URL
    return `/uploads/${folder}/${filename}`;
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
    if (!ALLOWED_TYPES.includes(file.type)) {
        return {
            valid: false,
            error: 'Invalid file type. Only JPG, PNG, WebP, and GIF are allowed.',
        };
    }

    if (file.size > MAX_FILE_SIZE) {
        return {
            valid: false,
            error: 'File size exceeds 5MB limit.',
        };
    }

    return { valid: true };
}
