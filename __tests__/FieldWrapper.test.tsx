import { render, screen } from '@testing-library/react';
import FieldWrapper from '@/components/ui/FieldWrapper';

describe('FieldWrapper', () => {
  const defaultProps = {
    label: 'First Name',
    name: 'firstName',
    children: <input id="firstName" type="text" />
  };

  it('renders the label and children', () => {
    render(<FieldWrapper {...defaultProps} />);
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('displays a red asterisk when required', () => {
    render(<FieldWrapper {...defaultProps} required />);
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByText('*')).toHaveClass('text-red-600');
  });

  it('renders error message when provided', () => {
    render(
      <FieldWrapper {...defaultProps} error="This field is required" />
    );
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

});
