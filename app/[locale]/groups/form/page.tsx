'use client';
import GroupBookingForm from '@/components/forms/GroupBookingForm';
import { FormErrorProvider } from '@/contexts/FormErrorContext';
import { useTranslations } from '@/i18n/client';

export default function GroupFormPage() {
  const t = useTranslations();

  return (
    <main className="px-4 py-6 sm:px-6 lg:px-8 max-w-3xl mx-auto p-6 bg-white text-black h-full m-auto">
      <h1 className="text-2xl font-bold mb-4 flex justify-center">
        {t('form.pageTitle')}
      </h1>
      <p className="text-m mb-4 flex justify-center">
        {t('form.pageDescription')}
      </p>
      <FormErrorProvider>
        <GroupBookingForm />
      </FormErrorProvider>
    </main>
  );
}
