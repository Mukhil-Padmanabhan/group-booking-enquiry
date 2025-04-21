import { forwardRef, TextareaHTMLAttributes } from 'react';
import { useInputStyle } from '@/hooks/useInputStyle';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        aria-invalid={!!error}
        {...props}
        className={useInputStyle(error, className)}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
export default Textarea;
