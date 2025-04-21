import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from '@/components/ui/Checkbox';

describe('Checkbox', () => {
  const label = 'Accept Terms';

  it('renders with custom id', () => {
    render(<Checkbox label={label} id="custom-id" />);
    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toHaveAttribute('id', 'custom-id');
  });

  it('renders an error message if error prop is passed', () => {
    render(<Checkbox label={label} error="This is required" />);
    expect(screen.getByText('This is required')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('fires onChange event', () => {
    const handleChange = jest.fn();
    render(<Checkbox label={label} onChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(<Checkbox className="custom-class" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass('custom-class');
  });
});
