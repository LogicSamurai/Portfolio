'use client';

import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

type ButtonBaseProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'style'>;

export interface ButtonProps extends ButtonBaseProps {
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    children?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = 'primary', size = 'md', fullWidth = false, className = '', children, ...props }, ref) => {
        const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed';

        const variantStyles = {
            primary: 'bg-accent text-[#000000] hover:bg-accent-hover active:scale-95 font-semibold',
            secondary: 'bg-surface-elevated text-foreground hover:bg-surface border border-border active:scale-95',
            ghost: 'bg-transparent text-foreground hover:bg-surface-elevated active:scale-95',
            outline: 'bg-transparent border-2 border-border text-foreground hover:border-accent hover:text-accent active:scale-95',
        };

        const sizeStyles = {
            sm: 'px-3 py-1.5 text-[10px] tracking-widest uppercase rounded-lg',
            md: 'px-5 py-2.5 text-xs tracking-[0.2em] uppercase rounded-xl',
            lg: 'px-8 py-4 text-sm tracking-[0.3em] uppercase rounded-2xl',
        };

        const widthStyle = fullWidth ? 'w-full' : '';

        const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`.trim();

        return (
            <motion.button
                ref={ref}
                className={combinedClassName}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                {...props}
            >
                {children}
            </motion.button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
