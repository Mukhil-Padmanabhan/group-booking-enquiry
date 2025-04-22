import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import { useTranslations } from '@/i18n/client';
import { FormErrorContext } from '@/contexts/FormErrorContext';
import { useDraftStorage } from '@/hooks/useDraftStorage';
import { GroupBookingFormValues } from '@/components/forms/GroupBookingForm';
import ContactDetails from '@/components/forms/sections/ContactDetails';

// Mock dependencies
jest.mock('@/i18n/client', () => ({
  useTranslations: jest.fn(() => (key: string) => key),
}));
jest.mock('@/hooks/useDraftStorage', () => ({
  useDraftStorage: jest.fn(() => ({
    saveSection: jest.fn(),
  })),
}));
jest.mock('@/components/ui/FieldWrapper', () => {
  return function MockFieldWrapper({ label, children, error, required }: any) {
    return (
      <div data-testid={`field-wrapper-${label}`}>
        <label>{label}{required && '*'}</label>
        {children}
        {error && <p data-testid={`error-${label}`}>{error}</p>}
      </div>
    );
  };
});
jest.mock('@/components/ui/Select', () => {
  return function MockSelect({ children, error, ...props }: any) {
    return (
      <div data-testid="select-title">
        <select {...props}>{children}</select>
        {error && <p data-testid="error-title">{error}</p>}
      </div>
    );
  };
});
jest.mock('@/components/ui/Input', () => {
  return function MockInput({ error, id, ...props }: any) {
    return (
      <div data-testid={`input-${id}`}>
        <input data-testid={`input-field-${id}`} id={id} {...props} />
        {error && <p data-testid={`error-${id}`}>{error}</p>}
      </div>
    );
  };
});
jest.mock('@/components/ui/PhoneInput', () => {
  return function MockPhoneInput({ name, error }: any) {
    return (
      <div data-testid="phone-input">
        <input data-testid="input-field-phone" name={name} />
        {error && <p data-testid="error-phone">{error}</p>}
      </div>
    );
  };
});
jest.mock('@/components/ui/Button', () => {
  return function MockButton({ children, ...props }: any) {
    return <button data-testid="continue-button" {...props}>{children}</button>;
  };
});

const defaultValues: GroupBookingFormValues = {
  title: '',
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  roomsSingle: 0,
  roomsDouble: 0,
  roomsTwin: 0,
  family2: 0,
  family3A: 0,
  family3B: 0,
  family4: 0,
  accessibleSingle: 0,
  accessibleDouble: 0,
  accessibleTwin: 0,
  hasChildren: false,
  needsAccessibleRoom: false,
  additionalInfo: '',
};

const TestWrapper = ({ onContinue = jest.fn() }: { onContinue?: () => void }) => {
  const methods = useForm<GroupBookingFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: async (data) => {
      const errors: Record<string, { type: string; message: string }> = {};
      if (!data.title) errors.title = { type: 'required', message: 'Title is required' };
      if (!data.firstName) errors.firstName = { type: 'required', message: 'First name is required' };
      if (!data.lastName) errors.lastName = { type: 'required', message: 'Last name is required' };
      if (!data.phone) errors.phone = { type: 'required', message: 'Phone is required' };
      if (!data.email) errors.email = { type: 'required', message: 'Email is required' };
      return { values: data, errors };
    },
  });
  const setSectionError = jest.fn();
  return (
    <FormErrorContext.Provider value={{ setSectionError, sectionErrors: {} }}>
      <FormProvider {...methods}>
        <ContactDetails onContinue={onContinue} />
      </FormProvider>
    </FormErrorContext.Provider>
  );
};

describe('ContactDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useTranslations as jest.Mock).mockReturnValue((key: string) => key);
  });

  it('renders all contact detail fields', () => {
    render(<TestWrapper />);

    expect(screen.getByTestId('field-wrapper-fields.title')).toBeInTheDocument();
    expect(screen.getByTestId('field-wrapper-contactDetails.firstName')).toBeInTheDocument();
    expect(screen.getByTestId('field-wrapper-contactDetails.lastName')).toBeInTheDocument();
    expect(screen.getByTestId('field-wrapper-fields.phone')).toBeInTheDocument();
    expect(screen.getByTestId('field-wrapper-fields.email')).toBeInTheDocument();
  });

  it('renders title select with correct options', () => {
    render(<TestWrapper />);

    const select = screen.getByTestId('select-title').querySelector('select');
    expect(select).toHaveValue('');
    expect(screen.getByText('Mr')).toBeInTheDocument();
    expect(screen.getByText('Mrs')).toBeInTheDocument();
    expect(screen.getByText('Miss')).toBeInTheDocument();
    expect(screen.getByText('Ms')).toBeInTheDocument();
    expect(screen.getByText('Dr')).toBeInTheDocument();
  });

  it('updates field values correctly', async () => {
    render(<TestWrapper />);

    const titleSelect = screen.getByTestId('select-title').querySelector('select');
    const firstNameInput = screen.getByTestId('input-field-firstName');
    const lastNameInput = screen.getByTestId('input-field-lastName');
    const phoneInput = screen.getByTestId('input-field-phone');
    const emailInput = screen.getByTestId('input-field-email');

    fireEvent.change(titleSelect!, { target: { value: 'Mr' } });
    fireEvent.change(firstNameInput!, { target: { value: 'John' } });
    fireEvent.change(lastNameInput!, { target: { value: 'Doe' } });
    fireEvent.change(phoneInput!, { target: { value: '+1234567890' } });
    fireEvent.change(emailInput!, { target: { value: 'john.doe@example.com' } });

    await waitFor(() => {
      expect(titleSelect).toHaveValue('Mr');
      expect(firstNameInput).toHaveValue('John');
      expect(lastNameInput).toHaveValue('Doe');
      expect(phoneInput).toHaveValue('+1234567890');
      expect(emailInput).toHaveValue('john.doe@example.com');
    });
  });

  it('shows validation errors when continue is clicked with empty fields', async () => {
    const onContinue = jest.fn();
    render(<TestWrapper onContinue={onContinue} />);

    const continueButton = screen.getByTestId('continue-button');
    fireEvent.click(continueButton);

    await waitFor(() => {
      expect(onContinue).not.toHaveBeenCalled();
      expect(screen.getByTestId('error-title')).toHaveTextContent('Title is required');
      expect(screen.getByTestId('error-firstName')).toHaveTextContent('First name is required');
      expect(screen.getByTestId('error-lastName')).toHaveTextContent('Last name is required');
      expect(screen.getByTestId('error-phone')).toHaveTextContent('Phone is required');
      expect(screen.getByTestId('error-email')).toHaveTextContent('Email is required');
    });
  });


  it('calls saveSection when continue is clicked', async () => {
    const mockSaveSection = jest.fn();
    (useDraftStorage as jest.Mock).mockReturnValue({ saveSection: mockSaveSection });
    render(<TestWrapper />);

    const continueButton = screen.getByTestId('continue-button');
    fireEvent.click(continueButton);

    await waitFor(() => {
      expect(mockSaveSection).toHaveBeenCalledWith('group', expect.any(Object));
    });
  });

  it('sets section error when validation fails', async () => {
    const setSectionError = jest.fn();
    const TestWrapperWithError = ({ onContinue = jest.fn() }: { onContinue?: () => void }) => {
      const methods = useForm<GroupBookingFormValues>({
        defaultValues,
        mode: 'onChange',
        resolver: async (data) => {
          const errors: Record<string, { type: string; message: string }> = {};
          if (!data.title) errors.title = { type: 'required', message: 'Title is required' };
          if (!data.firstName) errors.firstName = { type: 'required', message: 'First name is required' };
          if (!data.lastName) errors.lastName = { type: 'required', message: 'Last name is required' };
          if (!data.phone) errors.phone = { type: 'required', message: 'Phone is required' };
          if (!data.email) errors.email = { type: 'required', message: 'Email is required' };
          return { values: data, errors };
        },
      });
      return (
        <FormErrorContext.Provider value={{ setSectionError, sectionErrors: {} }}>
          <FormProvider {...methods}>
            <ContactDetails onContinue={onContinue} />
          </FormProvider>
        </FormErrorContext.Provider>
      );
    };

    render(<TestWrapperWithError />);

    const continueButton = screen.getByTestId('continue-button');
    fireEvent.click(continueButton);

    await waitFor(() => {
      expect(setSectionError).toHaveBeenCalledWith('contact', true);
    });
  });
});