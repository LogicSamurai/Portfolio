'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, fullWidth = false, className = '', ...props }, ref) => {
        const baseStyles = 'px-4 py-2 bg-surface border border-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200';
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
                <input
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

Input.displayName = 'Input';

export default Input;
