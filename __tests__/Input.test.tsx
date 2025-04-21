import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '@/components/ui/Input';

describe('Input', () => {
  it('renders the input element with default props', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
  });

  it('renders with placeholder text', () => {
    render(<Input placeholder="Enter your name" />);
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  it('displays error message and sets appropriate accessibility attributes', () => {
    const errorMessage = 'This field is required';
    render(<Input error={errorMessage} />);

    const input = screen.getByRole('textbox');
    const error = screen.getByText(errorMessage);

    expect(error).toBeInTheDocument();
    expect(error).toHaveAttribute('role', 'alert');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby');
  });

  it('does not display error message or aria attributes if no error', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).not.toHaveAttribute('aria-describedby');
    expect(input).not.toHaveAttribute('aria-invalid="false"');
  });

  it('applies custom className', () => {
    render(<Input className="my-custom-class" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('my-custom-class');
  });

  it('supports typing input value', async () => {
    render(<Input />);
    const input = screen.getByRole('textbox');

    await userEvent.type(input, 'Hello');
    expect(input).toHaveValue('Hello');
  });
});
