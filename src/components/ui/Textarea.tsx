'use client';

import { TextareaHTMLAttributes, forwardRef } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, error, fullWidth = false, className = '', ...props }, ref) => {
        const baseStyles = 'px-4 py-2 bg-surface border border-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 resize-vertical min-h-[100px]';
        const errorStyles = error ? 'border-red-500 focus:ring-red-500' : '';
        const widthStyle = fullWidth ? 'w-full' : '';

        const combinedClassName = `${baseStyles} ${errorStyles} ${widthStyle} ${className}`.trim();

        return (
            <div className={fullWidth ? 'w-full' : ''}>
                {label && (
                    <label className="block text-sm font-medium text-foreground mb-2">
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    className={combinedClassName}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-sm text-red-400">{error}</p>
                )}
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';

export default Textarea;
