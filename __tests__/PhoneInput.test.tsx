import { render, screen } from '@testing-library/react';
import CustomPhoneInput from '@/components/ui/PhoneInput';
import { FormProvider, useForm } from 'react-hook-form';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({ defaultValues: { phone: '+447123456789' } });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('CustomPhoneInput', () => {
  it('renders the phone input field with default value', () => {
    render(
      <Wrapper>
        <CustomPhoneInput name="phone" />
      </Wrapper>
    );

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('+44 7123 456789');
  });

  it('applies error styles and shows error message when error is passed', () => {
    render(
      <Wrapper>
        <CustomPhoneInput name="phone" error="Invalid number" />
      </Wrapper>
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid number');
  });

  it('sets aria-describedby when error is passed', () => {
    render(
      <Wrapper>
        <CustomPhoneInput name="phone" error="Required" />
      </Wrapper>
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-describedby', 'phone-error');
  });
});
