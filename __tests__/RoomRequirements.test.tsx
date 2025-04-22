import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import { useTranslations } from '@/i18n/client';
import { FormErrorContext } from '@/contexts/FormErrorContext';
import { useDraftStorage } from '@/hooks/useDraftStorage';
import RoomRequirements from '@/components/forms/sections/RoomRequirements';
import { GroupBookingFormValues } from '@/components/forms/GroupBookingForm';

// Mock dependencies
jest.mock('@/i18n/client', () => ({
  useTranslations: jest.fn(() => (key: string) => key),
}));
jest.mock('@/hooks/useDraftStorage', () => ({
  useDraftStorage: jest.fn(() => ({
    saveSection: jest.fn(),
  })),
}));
jest.mock('@/components/ui/CounterInput', () => {
  return function MockCounterInput({ label, description, value, onChange, error }: any) {
    return (
      <div data-testid={`counter-${label}`}>
        <label>{label}</label>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value) || 0)}
        />
        <p>{description}</p>
        {error && <p data-testid="error">{error}</p>}
      </div>
    );
  };
});
jest.mock('@/components/ui/Checkbox', () => {
  return function MockCheckbox({ id, label, ...props }: any) {
    return (
      <div data-testid={`checkbox-${id}`}>
        <input type="checkbox" id={id} {...props} />
        <label htmlFor={id}>{label}</label>
      </div>
    );
  };
});
jest.mock('@/components/ui/Textarea', () => {
  return function MockTextarea({ ...props }: any) {
    return <textarea data-testid="textarea" {...props} />;
  };
});
jest.mock('@/components/ui/FieldWrapper', () => {
  return function MockFieldWrapper({ label, children }: any) {
    return (
      <div data-testid="field-wrapper">
        <label>{label}</label>
        {children}
      </div>
    );
  };
});

const defaultValues: GroupBookingFormValues = {
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
  const methods = useForm<GroupBookingFormValues>({ defaultValues });
  const setSectionError = jest.fn();
  return (
    <FormErrorContext.Provider value={{ setSectionError, sectionErrors: {} }}>
      <FormProvider {...methods}>
        <RoomRequirements onContinue={onContinue} />
      </FormProvider>
    </FormErrorContext.Provider>
  );
};

describe('RoomRequirements', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useTranslations as jest.Mock).mockReturnValue((key: string) => key);
  });

  it('renders standard room inputs', () => {
    render(<TestWrapper />);
    
    expect(screen.getByTestId('counter-room.single')).toBeInTheDocument();
    expect(screen.getByTestId('counter-room.double')).toBeInTheDocument();
    expect(screen.getByTestId('counter-room.twin')).toBeInTheDocument();
  });

  it('shows family room inputs when hasChildren is checked', async () => {
    render(<TestWrapper />);
    
    const hasChildrenCheckbox = screen.getByTestId('checkbox-hasChildren').querySelector('input');
    fireEvent.click(hasChildrenCheckbox!);
    
    await waitFor(() => {
      expect(screen.getByTestId('counter-room.family2')).toBeInTheDocument();
      expect(screen.getByTestId('counter-room.family3A')).toBeInTheDocument();
      expect(screen.getByTestId('counter-room.family3B')).toBeInTheDocument();
      expect(screen.getByTestId('counter-room.family4')).toBeInTheDocument();
    });
  });

  it('shows accessible room inputs when needsAccessibleRoom is checked', async () => {
    render(<TestWrapper />);
    
    const accessibleCheckbox = screen.getByTestId('checkbox-needsAccessibleRoom').querySelector('input');
    fireEvent.click(accessibleCheckbox!);
    
    await waitFor(() => {
      expect(screen.getByTestId('counter-room.accessibleSingle')).toBeInTheDocument();
      expect(screen.getByTestId('counter-room.accessibleDouble')).toBeInTheDocument();
      expect(screen.getByTestId('counter-room.accessibleTwin')).toBeInTheDocument();
    });
  });

  it('displays total rooms correctly', async () => {
    render(<TestWrapper />);
    
    const singleInput = screen.getByTestId('counter-room.single').querySelector('input');
    fireEvent.change(singleInput!, { target: { value: '2' } });
    
    const doubleInput = screen.getByTestId('counter-room.double').querySelector('input');
    fireEvent.change(doubleInput!, { target: { value: '3' } });
    
    await waitFor(() => {
      expect(screen.getByText('room.total: 5 room.rooms')).toBeInTheDocument();
    });
  });

  it('shows error when hasChildren is true but no family rooms selected', async () => {
    const onContinue = jest.fn();
    render(<TestWrapper onContinue={onContinue} />);
    
    const hasChildrenCheckbox = screen.getByTestId('checkbox-hasChildren').querySelector('input');
    fireEvent.click(hasChildrenCheckbox!);
    
    const continueButton = screen.getByText('fields.continue');
    fireEvent.click(continueButton);
    
    await waitFor(() => {
      expect(screen.getByText('room.familyRequirement')).toBeInTheDocument();
      expect(onContinue).not.toHaveBeenCalled();
    });
  });

  it('shows error when needsAccessibleRoom is true but no accessible rooms selected', async () => {
    const onContinue = jest.fn();
    render(<TestWrapper onContinue={onContinue} />);
    
    const accessibleCheckbox = screen.getByTestId('checkbox-needsAccessibleRoom').querySelector('input');
    fireEvent.click(accessibleCheckbox!);
    
    const continueButton = screen.getByText('fields.continue');
    fireEvent.click(continueButton);
    
    await waitFor(() => {
      expect(screen.getByText('room.accessibleRequirement')).toBeInTheDocument();
      expect(onContinue).not.toHaveBeenCalled();
    });
  });

  it('shows error when no rooms selected and no special requirements', async () => {
    const onContinue = jest.fn();
    render(<TestWrapper onContinue={onContinue} />);
    
    const continueButton = screen.getByText('fields.continue');
    fireEvent.click(continueButton);
    
    await waitFor(() => {
      expect(screen.getByText('room.standardRequirement')).toBeInTheDocument();
      expect(onContinue).not.toHaveBeenCalled();
    });
  });

  it('calls onContinue when valid rooms are selected', async () => {
    const onContinue = jest.fn();
    render(<TestWrapper onContinue={onContinue} />);
    
    const singleInput = screen.getByTestId('counter-room.single').querySelector('input');
    fireEvent.change(singleInput!, { target: { value: '1' } });
    
    const continueButton = screen.getByText('fields.continue');
    fireEvent.click(continueButton);
    
    await waitFor(() => {
      expect(onContinue).toHaveBeenCalled();
      expect(screen.queryByText('room.standardRequirement')).not.toBeInTheDocument();
    });
  });

  it('renders and updates additional info textarea', async () => {
    render(<TestWrapper />);
    
    const textarea = screen.getByTestId('textarea');
    fireEvent.change(textarea, { target: { value: 'Test info' } });
    
    expect(textarea).toHaveValue('Test info');
  });
});