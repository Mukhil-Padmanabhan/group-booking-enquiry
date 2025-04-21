import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import { FormErrorProvider } from '@/contexts/FormErrorContext';
import { GroupBookingFormValues } from '@/components/forms/GroupBookingForm';

export const renderWithForm = (
  ui: ReactNode,
  defaultValues?: Partial<GroupBookingFormValues>
) => {
  const Wrapper = () => {
    const methods = useForm<GroupBookingFormValues>({
      defaultValues,
      mode: 'onBlur',
    });

    return (
      <FormErrorProvider>
        <FormProvider {...methods}>{ui}</FormProvider>
      </FormErrorProvider>
    );
  };

  return render(<Wrapper />);
};
