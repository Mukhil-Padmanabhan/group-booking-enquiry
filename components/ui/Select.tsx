import { forwardRef, SelectHTMLAttributes } from 'react';
import { useInputStyle } from '@/hooks/useInputStyle';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    error?: string;
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ error, className = '', ...props }, ref) => {
        return (
            <select
                ref={ref}
                aria-invalid={!!error}
                {...props}
                className={useInputStyle(error, className)}
            />
        );
    }
);

Select.displayName = 'Select';
export default Select;
