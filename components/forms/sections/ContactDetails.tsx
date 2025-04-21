'use client';

import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { useTranslations } from '@/i18n/client';

import FieldWrapper from '@/components/ui/FieldWrapper';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { GroupBookingFormValues } from '../GroupBookingForm';
import { useFormErrorContext } from '@/contexts/FormErrorContext';
import { useDraftStorage } from '@/hooks/useDraftStorage';

const CustomPhoneInput = dynamic(() => import('@/components/ui/PhoneInput'), { ssr: false });
type Props = {
  onContinue?: () => void;
};

export default function ContactDetails({ onContinue }: Props) {
  const t = useTranslations();
  const { saveSection } = useDraftStorage();
  const { setSectionError } = useFormErrorContext();
  const [continueClicked, setContinueClicked] = useState(false);

  const {
    register,
    getValues,
    trigger,
    getFieldState,
    control,
    formState: { errors },
  } = useFormContext<GroupBookingFormValues>();

  useEffect(() => {
    if (continueClicked) {
      const autoValidate = async () => {
        const isValid = await trigger(['title', 'firstName', 'lastName', 'phone', 'email']);
        setSectionError('contact', !isValid);
      };
      autoValidate();
    }
    return () => setContinueClicked(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [control, continueClicked]);

  const handleContinue = async () => {
    setContinueClicked(true);
    saveSection('group', getValues());

    const fields: (keyof GroupBookingFormValues)[] = ['title', 'firstName', 'lastName', 'phone', 'email'];
    const valid = await trigger(fields);

    if (!valid) {
      const fieldErrors = fields.reduce((acc, field) => {
        const { error } = getFieldState(field);
        if (error?.message && typeof error.message === 'string') {
          acc[field] = error.message;
        } else {
          console.warn(`Missing message for field "${field}"`, error);
        }
        return acc;
      }, {} as Record<string, string>);

      console.log('Errors:', fieldErrors);
      setSectionError('contact', true);
      return;
    }
    onContinue?.()
    setSectionError('contact', false);
  };

  return (
    <div className="space-y-6 text-black">
      <FieldWrapper label={t('fields.title')} name="title" error={errors.title?.message} required>
        <Select {...register('title')} error={errors.title?.message}>
          <option value="">{t('fields.title')}</option>
          <option value="Mr">Mr</option>
          <option value="Mrs">Mrs</option>
          <option value="Miss">Miss</option>
          <option value="Ms">Ms</option>
          <option value="Dr">Dr</option>
        </Select>
      </FieldWrapper>

      <FieldWrapper label={t('contactDetails.firstName')} name="firstName" required>
        <Input {...register('firstName')} error={errors.firstName?.message} id={"firstName"} />
      </FieldWrapper>

      <FieldWrapper label={t('contactDetails.lastName')} name="lastName" required>
        <Input {...register('lastName')} error={errors.lastName?.message} id={"lastName"} />
      </FieldWrapper>

      <FieldWrapper label={t('fields.phone')} name="phone" required>
        <div className="w-full">
          <CustomPhoneInput name="phone" error={errors.phone?.message} />
        </div>
      </FieldWrapper>

      <FieldWrapper label={t('fields.email')} name="email" required>
        <Input {...register('email')} error={errors.email?.message} id={"email"} />
      </FieldWrapper>

      <div className="pt-4">
        <Button type="button" onClick={handleContinue}>
          {t('fields.continue')}
        </Button>
      </div>
    </div>
  );
}
