'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary';
    children: ReactNode;
};

export default function Button({
    children,
    variant = 'primary',
    className = '',
    type = 'button',
    ...props
}: ButtonProps) {
    const baseClasses =
        'rounded px-6 py-2 font-medium focus:outline-none focus:ring-2 transition-all';
    const variantClasses =
        variant === 'primary'
            ? 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500'
            : 'bg-gray-100 text-black hover:bg-gray-200 focus:ring-gray-400';

    return (
        <button
            type={type}
            className={`${baseClasses} ${variantClasses} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
