import { render, screen, fireEvent } from '@testing-library/react';
import CounterInput from '@/components/ui/CounterInput';

describe('CounterInput', () => {
  const setup = (props = {}) => {
    const onChange = jest.fn();
    render(
      <CounterInput
        label="Guests"
        value={3}
        onChange={onChange}
        {...props}
      />
    );
    return { onChange };
  };

  it('renders label and buttons correctly', () => {
    setup();
    expect(screen.getByText('Guests')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Decrease Guests/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Increase Guests/i })).toBeInTheDocument();
    expect(screen.getByDisplayValue('3')).toBeInTheDocument();
  });

  it('decrements value when minus button is clicked', () => {
    const { onChange } = setup({ value: 2 });
    fireEvent.click(screen.getByRole('button', { name: /Decrease Guests/i }));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('increments value when plus button is clicked', () => {
    const { onChange } = setup({ value: 2 });
    fireEvent.click(screen.getByRole('button', { name: /Increase Guests/i }));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('respects min and max constraints', () => {
    const { onChange } = setup({ value: 0, min: 0, max: 1 });

    fireEvent.click(screen.getByRole('button', { name: /Decrease Guests/i }));
    expect(onChange).toHaveBeenCalledWith(0);

    fireEvent.click(screen.getByRole('button', { name: /Increase Guests/i }));
    expect(onChange).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByRole('button', { name: /Increase Guests/i }));
    expect(onChange).toHaveBeenCalledWith(1); // should not exceed max
  });

  it('disables buttons when disabled is true', () => {
    const { onChange } = setup({ value: 5, disabled: true });

    const minus = screen.getByRole('button', { name: /Decrease Guests/i });
    const plus = screen.getByRole('button', { name: /Increase Guests/i });

    expect(minus).toBeDisabled();
    expect(plus).toBeDisabled();

    fireEvent.click(minus);
    fireEvent.click(plus);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('displays error message when error prop is passed', () => {
    setup({ error: 'Required field' });
    expect(screen.getByText('Required field')).toBeInTheDocument();
    expect(screen.getByRole('spinbutton')).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders description when provided', () => {
    setup({ description: 'Age 16+' });
    expect(screen.getByText('(Age 16+)')).toBeInTheDocument();
  });
});
