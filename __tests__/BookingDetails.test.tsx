import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import BookingDetails from '@/components/forms/sections/BookingDetails';
import { FormProvider, useForm } from 'react-hook-form';
import { FormErrorProvider } from '@/contexts/FormErrorContext';

const mockSaveSection = jest.fn();
const mockLoadSection = jest.fn(() => ({}));

jest.mock('@/hooks/useDraftStorage', () => ({
    useDraftStorage: () => ({
        saveSection: mockSaveSection,
        loadSection: mockLoadSection
    }),
}));

jest.mock('@/i18n/client', () => ({
    useTranslations: () => (key: string) => key,
}));

jest.mock('react-hook-form', () => {
    const original = jest.requireActual('react-hook-form');
    return {
      ...original,
      useFormContext: () => ({
        ...original.useFormContext(),
        trigger: jest.fn(() => Promise.resolve(false)), 
      }),
    };
  });

const renderWithForm = (children: React.ReactNode) => {
    const Wrapper = () => {
        const methods = useForm();
        return (
            <FormErrorProvider>
                <FormProvider {...methods}>
                    {children}
                </FormProvider>
            </FormErrorProvider>
        );
    };

    render(<Wrapper />);
};

describe('BookingDetails', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders all required fields and sections', () => {
        renderWithForm(<BookingDetails onContinue={() => {}}/>);

        expect(screen.getByText('booking.bookerType')).toBeInTheDocument();
        expect(screen.getByText('booking.stayPurpose')).toBeInTheDocument();
        expect(screen.getByText('booking.visitReason')).toBeInTheDocument();
        expect(screen.getByText('booking.bookingDetailsTitle')).toBeInTheDocument();
        expect(screen.getByText('booking.checkIn')).toBeInTheDocument();
        expect(screen.getByText('booking.checkOut')).toBeInTheDocument();
        expect(screen.getByText('booking.packageType')).toBeInTheDocument();
    });

    it('shows company name input when bookerType is not Personal', async () => {
        renderWithForm(<BookingDetails onContinue={() => {}} />);

        const businessRadio = screen.getByLabelText('booking.bookerOptions.business');
        fireEvent.click(businessRadio);
        const input = screen.getByText("booking.companyName");
        expect(input).toBeInTheDocument();
    });

    it('saves section on continue click', async () => {
        renderWithForm(<BookingDetails onContinue={() => {}}/>);
        const continueButton = screen.getByRole('button', { name: 'fields.continue' });
        fireEvent.click(continueButton);

        await waitFor(() => {
            expect(mockSaveSection).toHaveBeenCalledWith('group', expect.any(Object));
        });
    });

    it('triggers validation on continue', async () => {
        const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation(() => { });

        renderWithForm(<BookingDetails onContinue={() => {}}/>);

        const continueButton = screen.getByRole('button', { name: 'fields.continue' });

        fireEvent.click(continueButton);

        await waitFor(() => {
            expect(consoleWarnMock).toHaveBeenCalledWith('ERROR - Validation failed');
        });

        consoleWarnMock.mockRestore();
    });
});
