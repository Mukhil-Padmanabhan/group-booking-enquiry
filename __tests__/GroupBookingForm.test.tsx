import { render, screen } from '@testing-library/react';
import GroupBookingForm from '@/components/forms/GroupBookingForm';
import { FormErrorProvider } from '@/contexts/FormErrorContext';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => '/en/groups/form',
  useParams: () => ({ locale: 'en' }),
  useSearchParams: () => new URLSearchParams(),
}));

jest.mock('@/i18n/client', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'form.contactDetails': 'Contact Details',
      'form.bookingDetails': 'Booking Details',
      'form.roomRequirements': 'Room Requirements',
      'form.submit': 'Submit',
    };
    return translations[key] ?? key;
  },
}));

const mockSubmitBooking = jest.fn();
const mockClearDraft = jest.fn();
const mockGetProgress = jest.fn(() => 75);

jest.mock('@/hooks/useSubmitGroupBooking', () => ({
  useSubmitGroupBooking: () => ({
    submitBooking: mockSubmitBooking,
  }),
}));

jest.mock('@/hooks/useDraftStorage', () => ({
  useDraftStorage: () => ({
    clearDraft: mockClearDraft,
    getProgress: mockGetProgress,
    saveSection: jest.fn(),
    loadSection: jest.fn(() => ({})),
  }),
}));

describe('GroupBookingForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form with all sections and submit button', () => {
    render(
      <FormErrorProvider>
        <GroupBookingForm />
      </FormErrorProvider>
    );

    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getByText('Contact Details')).toBeInTheDocument();
    expect(screen.getByText('Booking Details')).toBeInTheDocument();
    expect(screen.getByText('Room Requirements')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });
});
