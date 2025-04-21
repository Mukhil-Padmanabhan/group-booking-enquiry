import { ReactNode } from 'react';

interface FieldWrapperProps {
    label: string;
    name: string;
    children: ReactNode;
    error?: string;
    required?: boolean;
}

export default function FieldWrapper({
    label,
    name,
    children,
    error,
    required = false,
}: FieldWrapperProps) {
    const describedById = error ? `${name}-error` : undefined;

    return (
        <div className="space-y-1 w-full">
            <label
                htmlFor={name}
                className="block font-medium text-sm text-gray-900"
            >
                {label}
                {required && <span className="text-red-600 ml-1">*</span>}
            </label>

            {/* Inject aria attributes if child is a form control */}
            <div aria-describedby={describedById}>{children}</div>

            {error && (
                <p id={describedById} className="text-red-600 text-sm mt-1" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}
