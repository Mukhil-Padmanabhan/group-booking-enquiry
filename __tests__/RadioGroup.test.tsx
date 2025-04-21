import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RadioGroup from '@/components/ui/RadioGroup';
import { useForm, FormProvider } from 'react-hook-form';

const renderWithForm = (defaultValues = {}, error?: string) => {
  const Wrapper = () => {
    const methods = useForm({ defaultValues });
    return (
      <FormProvider {...methods}>
        <RadioGroup
          name="stayPurpose"
          label="Purpose of stay"
          options={[
            { label: 'Business', value: 'business' },
            { label: 'Leisure', value: 'leisure' }
          ]}
          error={error}
        />
      </FormProvider>
    );
  };

  render(<Wrapper />);
};

describe('RadioGroup', () => {
  it('renders label and options correctly', () => {
    renderWithForm();

    expect(screen.getByText('Purpose of stay')).toBeInTheDocument();
    expect(screen.getByLabelText('Business')).toBeInTheDocument();
    expect(screen.getByLabelText('Leisure')).toBeInTheDocument();
  });

  it('selects a radio option when clicked', async () => {
    renderWithForm();
    const radio = screen.getByLabelText('Leisure');
    await userEvent.click(radio);

    expect(radio).toBeChecked();
  });

  it('shows error message and applies error styles', () => {
    renderWithForm({}, 'This field is required');

    expect(screen.getByText('This field is required')).toBeInTheDocument();
    const legend = screen.getByText('Purpose of stay');
    expect(legend).toHaveClass('text-red-600');
  });

  it('does not show error styles if no error is passed', () => {
    renderWithForm();

    const legend = screen.getByText('Purpose of stay');
    expect(legend).toHaveClass('text-gray-900');
  });
});
