'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  label?: string;
  id?: string;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = '', error, label, id, ...props }, ref) => {
    const finalId = id;

    return (
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          type="checkbox"
          id={finalId}
          aria-invalid={!!error}
          aria-describedby={error ? `${finalId}-error` : undefined}
          className={`h-4 w-4 rounded border focus:ring-2 transition-colors ${
            error
              ? 'border-red-600 ring-red-600'
              : 'border-gray-300 ring-purple-600'
          } ${className}`}
          {...props}
        />
        {label && (
          <label htmlFor={finalId} className="text-sm text-gray-800">
            {label}
          </label>
        )}
        {error && (
          <p id={`${finalId}-error`} className="text-xs text-red-600 mt-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
export default Checkbox;
