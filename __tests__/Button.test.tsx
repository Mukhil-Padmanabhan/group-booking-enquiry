import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/ui/Button';

describe('Button component', () => {
  const label = 'Click Me';

  it('renders with default primary variant', () => {
    render(<Button>{label}</Button>);
    const button = screen.getByRole('button', { name: label });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-purple-600 text-white hover:bg-purple-700');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('renders with secondary variant', () => {
    render(<Button variant="secondary">{label}</Button>);
    const button = screen.getByRole('button', { name: label });

    expect(button).toHaveClass('bg-gray-100 text-black hover:bg-gray-200');
  });

  it('applies additional class names', () => {
    render(<Button className="custom-class">{label}</Button>);
    const button = screen.getByRole('button', { name: label });

    expect(button).toHaveClass('custom-class');
  });

  it('respects the "type" prop', () => {
    render(<Button type="submit">{label}</Button>);
    const button = screen.getByRole('button', { name: label });

    expect(button).toHaveAttribute('type', 'submit');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>{label}</Button>);

    fireEvent.click(screen.getByRole('button', { name: label }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
