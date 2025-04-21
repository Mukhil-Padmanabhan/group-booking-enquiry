'use client';

import { useEffect, useMemo, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import Accordion from '@/components/ui/Accordion';
import ContactDetails from './sections/ContactDetails';
import BookingDetails from './sections/BookingDetails';
import RoomRequirements from './sections/RoomRequirements';

import { getFullSchema } from '@/lib/validationSchemas';
import { useTranslations } from '@/i18n/client';
import { useSubmitGroupBooking } from '@/hooks/useSubmitGroupBooking';
import { useDraftStorage } from '@/hooks/useDraftStorage';

export type GroupBookingFormValues = z.infer<ReturnType<typeof getFullSchema>>;

type Section = 'contact' | 'booking' | 'rooms' | null;

export default function GroupBookingForm() {
  const t = useTranslations();
  const schema = useMemo(() => getFullSchema(t), [t]) as z.ZodType<GroupBookingFormValues>;
  const methods = useForm<GroupBookingFormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const { submitBooking } = useSubmitGroupBooking();
  const { clearDraft, getProgress, loadSection } = useDraftStorage();
  const [progress, setProgress] = useState(0);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<Section>('contact');
  const { setValue } = methods;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = loadSection('group');
      if (saved) {
        Object.entries(saved).forEach(([key, value]) => {
          setValue(
            key as keyof GroupBookingFormValues,
            value as string | number | boolean | undefined
          );
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setProgress(getProgress());
    const interval = setInterval(() => {
      setProgress(getProgress());
    }, 1000);

    return () => clearInterval(interval);
  }, [getProgress]);

  const triggerProgressUpdate = () => {
    const updated = getProgress();
    setProgress(updated);
  };

  const onSubmitHandler = async (data: GroupBookingFormValues) => {
    try {
      setResponseMessage(null);
      await submitBooking(data);
      setResponseMessage('SUCCESSFUL - Booking submitted successfully!');
      clearDraft();
      methods.reset();
      setOpenSection('contact');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      setResponseMessage(`ERROR - ${message}`);
    }
  };

  const onInvalidHandler = (errors: FieldErrors<GroupBookingFormValues>) => {
    console.warn('Validation failed:', errors);
  };

  return (
    <>
      {/* <div className="w-full bg-gray-200 h-2 rounded overflow-hidden mb-4">
        <div
          className="bg-purple-600 h-full transition-all duration-300"
          style={{ width: `${progress}%` }}
          role="progressbar"
        />
      </div> */}

      <FormProvider {...methods}>
        <form
          role='form'
          onSubmit={(e) => {
            e.preventDefault();
            console.log("SUBMIT")
            methods.handleSubmit(onSubmitHandler, onInvalidHandler)(e);
          }}
        >
          <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
            <Accordion
              title={t('form.contactDetails')}
              isOpen={openSection === 'contact'}
              onToggle={() => setOpenSection(openSection === 'contact' ? null : 'contact')}
            >
              <ContactDetails onContinue={triggerProgressUpdate} />
            </Accordion>

            <Accordion
              title={t('form.bookingDetails')}
              isOpen={openSection === 'booking'}
              onToggle={() => setOpenSection(openSection === 'booking' ? null : 'booking')}
            >
              <BookingDetails onContinue={triggerProgressUpdate}/>
            </Accordion>

            <Accordion
              title={t('form.roomRequirements')}
              isOpen={openSection === 'rooms'}
              onToggle={() => setOpenSection(openSection === 'rooms' ? null : 'rooms')}
            >
              <RoomRequirements onContinue={triggerProgressUpdate}/>
            </Accordion>
          </div>

          <div className="mt-6 text-center">
            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition-colors"
            >
              {t('form.submit')}
            </button>
            {responseMessage && (
              <p
                className={`font-medium mt-4 ${responseMessage.startsWith('SUCCESSFUL') ? 'text-green-600' : 'text-red-600'
                  }`}
              >
                {responseMessage}
              </p>
            )}
          </div>
        </form>
      </FormProvider>
    </>
  );
}
