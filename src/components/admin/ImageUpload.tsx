'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Button from '../ui/Button';

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    folder?: string;
    label?: string;
}

export default function ImageUpload({ value, onChange, folder = 'general', label = 'Upload Image' }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('folder', folder);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.error || 'Upload failed');
            }

            const { url } = await response.json();
            onChange(url);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-4">
            <label className="block text-sm font-medium text-foreground">
                {label}
            </label>

            {value && (
                <div className="relative w-full h-64 rounded-lg overflow-hidden border border-border">
                    <Image
                        src={value}
                        alt="Preview"
                        fill
                        className="object-cover"
                    />
                </div>
            )}

            <div className="flex gap-4">
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />

                <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                >
                    {uploading ? 'Uploading...' : value ? 'Change Image' : 'Select Image'}
                </Button>

                {value && (
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => onChange('')}
                        disabled={uploading}
                    >
                        Remove
                    </Button>
                )}
            </div>

            {error && (
                <p className="text-sm text-red-400">{error}</p>
            )}

            <p className="text-xs text-muted">
                Supported formats: JPG, PNG, WebP, GIF. Max size: 5MB
            </p>
        </div>
    );
}
