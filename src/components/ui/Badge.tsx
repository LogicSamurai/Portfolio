'use client';

import { HTMLAttributes, ReactNode } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'outline' | 'accent' | 'success' | 'warning' | 'error';
    size?: 'sm' | 'md' | 'lg';
    children: ReactNode;
}

export default function Badge({
    variant = 'default',
    size = 'md',
    className = '',
    children,
    ...props
}: BadgeProps) {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-colors';

    const variantStyles = {
        default: 'bg-surface-elevated text-foreground border border-border',
        outline: 'bg-transparent text-muted border border-border',
        accent: 'bg-accent font-bold text-[#000000]',
        success: 'bg-green-500/10 text-green-400 border border-green-500/20',
        warning: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
        error: 'bg-red-500/10 text-red-400 border border-red-500/20',
    };

    const sizeStyles = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-1.5 text-base',
    };

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim();

    return (
        <span className={combinedClassName} {...props}>
            {children}
        </span>
    );
}
