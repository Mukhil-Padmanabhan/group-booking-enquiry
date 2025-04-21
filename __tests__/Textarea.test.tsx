import { render, screen } from '@testing-library/react';
import Textarea from '@/components/ui/Textarea';

describe('Textarea', () => {
  it('renders a textarea element', () => {
    render(<Textarea />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
  });

  it('applies default class and accepts custom class', () => {
    render(<Textarea className="custom-class" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('custom-class');
  });

  it('renders with error styles and ARIA attributes when error is passed', () => {
    render(<Textarea error="This is an error" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not have aria-invalid if error is not passed', () => {
    render(<Textarea />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('aria-invalid', 'false');
  });

  it('passes all other props to textarea', () => {
    render(<Textarea placeholder="Your message here" rows={5} />);
    const textarea = screen.getByPlaceholderText('Your message here') as HTMLTextAreaElement;
    expect(textarea.rows).toBe(5);
  });
});
