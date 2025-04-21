import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GroupBookingForm from '@/components/forms/GroupBookingForm';
import { FormErrorProvider } from '@/contexts/FormErrorContext';

// Mocks
const mockSubmitBooking = jest.fn();
const mockClearDraft = jest.fn();
const mockGetProgress = jest.fn(() => 75);

jest.mock('@/i18n/client', () => ({
    useTranslations: () => (key: string) => key,
}));

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
        expect(screen.getByText('form.contactDetails')).toBeInTheDocument();
        expect(screen.getByText('form.bookingDetails')).toBeInTheDocument();
        expect(screen.getByText('form.roomRequirements')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'form.submit' })).toBeInTheDocument();
    });

    // it('shows correct progress bar width', () => {
    //     render(
    //         <FormErrorProvider>
    //             <GroupBookingForm />
    //         </FormErrorProvider>
    //     );

    //     const progressBar = screen.getByRole('progressbar');
    //     expect(progressBar).toHaveStyle('width: 75%');
    // });
});
