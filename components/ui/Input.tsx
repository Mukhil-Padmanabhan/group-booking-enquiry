import { InputHTMLAttributes, forwardRef } from 'react';
import { useInputStyle } from '@/hooks/useInputStyle';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = '',id,  ...props }, ref) => {
    const inputId = id;
    const ariaDescribedBy = error ? `${inputId}-error` : undefined;

    return (
      <>
        <input
          id={inputId}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={ariaDescribedBy}
          className={useInputStyle(error, className)}
          {...props}
        />
        {error && (
          <span
            id={ariaDescribedBy}
            className="text-red-600 text-sm mt-1 block"
            role="alert"
          >
            {error}
          </span>
        )}
      </>
    );
  }
);

Input.displayName = 'Input';
export default Input;
