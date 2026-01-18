'use client';

import { HTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'> {
    hover?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    children: ReactNode;
}

export default function Card({
    hover = false,
    padding = 'md',
    className = '',
    children,
    ...props
}: CardProps) {
    const paddingStyles = {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    const baseStyles = 'bg-surface border border-border rounded-lg transition-all duration-200';
    const hoverStyles = hover ? 'hover:border-accent hover:shadow-lg hover:shadow-accent/10' : '';

    const combinedClassName = `${baseStyles} ${hoverStyles} ${paddingStyles[padding]} ${className}`.trim();

    if (hover) {
        return (
            <motion.div
                className={combinedClassName}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                {...props}
            >
                {children}
            </motion.div>
        );
    }

    return (
        <div className={combinedClassName} {...props}>
            {children}
        </div>
    );
}
