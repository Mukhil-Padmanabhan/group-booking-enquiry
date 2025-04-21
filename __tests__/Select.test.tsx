import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from '@/components/ui/Select';
import { useForm, FormProvider } from 'react-hook-form';

const renderSelect = (error?: string) => {
  const Wrapper = () => {
    const methods = useForm({
      defaultValues: { country: '' }
    });

    return (
      <FormProvider {...methods}>
        <Select name="country" error={error}>
          <option value="">Select a country</option>
          <option value="uk">United Kingdom</option>
          <option value="de">Germany</option>
        </Select>
      </FormProvider>
    );
  };

  render(<Wrapper />);
};

describe('Select', () => {
  it('renders all options correctly', () => {
    renderSelect();

    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Select a country')).toBeInTheDocument();
    expect(screen.getByText('United Kingdom')).toBeInTheDocument();
    expect(screen.getByText('Germany')).toBeInTheDocument();
  });

  it('allows selecting an option', async () => {
    renderSelect();

    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, 'de');

    expect((select as HTMLSelectElement).value).toBe('de');
  });

  it('adds aria-invalid when error is present', () => {
    renderSelect('This field is required');

    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not have aria-invalid if no error', () => {
    renderSelect();

    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('aria-invalid', 'false');
  });
});
