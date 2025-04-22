'use client';

import { useEffect, useMemo, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import Accordion from '@/components/ui/Accordion';
import ContactDetails from './sections/ContactDetails';
import BookingDetails from './sections/BookingDetails';
import RoomRequirements from './sections/RoomRequirements';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

import { getFullSchema } from '@/lib/validationSchemas';
import { useTranslations } from '@/i18n/client';
import { useSubmitGroupBooking } from '@/hooks/useSubmitGroupBooking';
import { useDraftStorage } from '@/hooks/useDraftStorage';
import { toast } from 'sonner';


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
  const { clearDraft, loadSection, saveSection } = useDraftStorage();
  const [progress, setProgress] = useState(0);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<Section>('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setValue } = methods;
  const sectionOrder: Section[] = ['contact', 'booking', 'rooms'];

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
    const progress = loadSection('progress');
    setProgress(progress)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const triggerProgressUpdate = (current: Section) => {
    handleSectionComplete(current)
  };

  const onSubmitHandler = async (data: GroupBookingFormValues) => {
    setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSectionComplete = (current: Section) => {
    toast.success(t('form.sectionSaved'));
    saveSection('progress', progress + 33.3)
    setProgress(progress + 33.3)
    const currentIndex = sectionOrder.indexOf(current);
    const next = sectionOrder[currentIndex + 1];
    if (next) {
      setOpenSection(next);
    }
  };

  return (
    <>
      <div className="w-full bg-gray-200 h-2 rounded overflow-hidden mb-4">
        <div
          className="bg-purple-600 h-full transition-all duration-300"
          style={{ width: `${progress}%` }}
          role="progressbar"
        />
      </div>
      <LanguageSwitcher />
      <FormProvider {...methods}>
        <form
          role='form'
          onSubmit={(e) => {
            e.preventDefault();
            methods.handleSubmit(onSubmitHandler)(e);
          }}
        >
          <div className="acc-bg bg-white dark:text-white shadow-sm rounded-lg divide-y divide-gray-200">
            <Accordion
              title={t('form.contactDetails')}
              isOpen={openSection === 'contact'}
              onToggle={() => setOpenSection(openSection === 'contact' ? null : 'contact')}
            >
              <ContactDetails onContinue={() => triggerProgressUpdate('contact')} />
            </Accordion>

            <Accordion
              title={t('form.bookingDetails')}
              isOpen={openSection === 'booking'}
              onToggle={() => setOpenSection(openSection === 'booking' ? null : 'booking')}
            >
              <BookingDetails onContinue={() => triggerProgressUpdate('booking')} />
            </Accordion>

            <Accordion
              title={t('form.roomRequirements')}
              isOpen={openSection === 'rooms'}
              onToggle={() => setOpenSection(openSection === 'rooms' ? null : 'rooms')}
            >
              <RoomRequirements onContinue={() => triggerProgressUpdate('rooms')} />
            </Accordion>
          </div>

          <div className="mt-6 text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="loader border-white"></span>
                  {t('form.submit')}
                </div>
              ) : (
                t('form.submit')
              )}
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
