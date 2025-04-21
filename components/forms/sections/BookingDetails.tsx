'use client';

import { useFormContext, Controller, useWatch } from 'react-hook-form';
import { GroupBookingFormValues } from '../GroupBookingForm';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import RadioGroup from '@/components/ui/RadioGroup';
import Checkbox from '@/components/ui/Checkbox';
import FieldWrapper from '@/components/ui/FieldWrapper';
import Typeahead from '@/components/ui/Typeahead';
import { format } from 'date-fns';
import { useTranslations } from '@/i18n/client';
import { useFormErrorContext } from '@/contexts/FormErrorContext';
import { useEffect, useState } from 'react';
import { useDraftStorage } from '@/hooks/useDraftStorage';

const hotelOptions = [
    { label: 'Premier Inn London City', value: 'london' },
    { label: 'Premier Inn Berlin Mitte', value: 'berlin' },
    { label: 'Premier Inn Munich Airport', value: 'munich' }
];

type Props = {
    onContinue?: () => void;
};

export default function BookingDetails({ onContinue }: Props) {
    const t = useTranslations();
    const { saveSection } = useDraftStorage();
    const { setSectionError } = useFormErrorContext();
    const {
        register,
        control,
        trigger,
        getFieldState,
        formState: { errors },
        getValues,
    } = useFormContext<GroupBookingFormValues>();
    const [continueClicked, setContinueClicked] = useState(false)

    useEffect(() => {

        if (continueClicked) {
            const validateSection = async () => {
                const fieldsToValidate: (keyof GroupBookingFormValues)[] = [
                    'bookerType',
                    'stayPurpose',
                    'visitReason',
                    'hotel',
                    'checkInDate',
                    'checkOutDate',
                    'package',
                ];

                const isValid = await trigger(fieldsToValidate);
                setSectionError('booking', !isValid);
            };

            validateSection();
        }
        return () => setContinueClicked(false)

    }, [
        useWatch({ name: 'bookerType', control }),
        useWatch({ name: 'stayPurpose', control }),
        useWatch({ name: 'visitReason', control }),
        useWatch({ name: 'hotel', control }),
        useWatch({ name: 'checkInDate', control }),
        useWatch({ name: 'checkOutDate', control }),
        useWatch({ name: 'package', control }),
        continueClicked
    ]);

    const bookerType = useWatch({ control, name: 'bookerType' });
    const today = format(new Date(), 'yyyy-MM-dd');
    const checkInDate = useWatch({ control, name: 'checkInDate' });

    const minCheckOutDate = checkInDate || today;

    const handleContinue = async () => {
        setContinueClicked(true)
        saveSection('group', getValues());
        const fieldsToValidate: (keyof GroupBookingFormValues)[] = [
            'bookerType',
            'stayPurpose',
            'visitReason',
            'hotel',
            'checkInDate',
            'checkOutDate',
            'package',
            ...(bookerType !== 'Personal' ? ['companyName'] : [])
        ];
        const isValid = await trigger(fieldsToValidate);
        if (!isValid) {
            console.warn('ERROR - Validation failed');
            const fieldErrors = fieldsToValidate.reduce((acc, field) => {
                const { error } = getFieldState(field as keyof GroupBookingFormValues);
                if (error) {
                    acc[field] = error.message;
                }
                return acc;
            }, {} as Record<string, string>);

            console.log('Field-level errors:', fieldErrors);
            return;
        }
        onContinue?.()
    };

    return (
        <div className="space-y-6 text-black">
            <RadioGroup
                name="bookerType"
                id={'bookerType'}
                label={t('booking.bookerType')}
                options={[
                    { label: t('booking.bookerOptions.personal'), value: 'Personal' },
                    { label: t('booking.bookerOptions.business'), value: 'Business' },
                    { label: t('booking.bookerOptions.tmc'), value: 'Travel Management Company' },
                    { label: t('booking.bookerOptions.agent'), value: 'Travel Agent/Tour Operator' }
                ]}
                error={errors.bookerType?.message}
            />

            {bookerType && bookerType !== 'Personal' && (
                <FieldWrapper
                    label={t('booking.companyName')}
                    name="companyName"
                    error={errors.companyName?.message}
                    required
                >
                    <Input id={"companyName"} role='textbox' {...register('companyName')} error={errors.companyName?.message} />
                </FieldWrapper>
            )}

            <RadioGroup
                name="stayPurpose"
                id={'stayPurpose'}
                label={t('booking.stayPurpose')}
                options={[
                    { label: t('booking.purposeOptions.business'), value: 'Business' },
                    { label: t('booking.purposeOptions.leisure'), value: 'Leisure' }
                ]}
                error={errors.stayPurpose?.message}
            />

            <Checkbox
                id={'isSchoolGroup'}
                label={t('booking.schoolGroup')}
                {...register('isSchoolGroup')}
            />

            <FieldWrapper
                label={t('booking.visitReason')}
                name="visitReason"
                error={errors.visitReason?.message}
                required
            >
                <Select {...register('visitReason')} error={errors.visitReason?.message}>
                    <option value="">{t('booking.selectReason')}</option>
                    <option value="Wedding">{t('booking.reasonOptions.wedding')}</option>
                    <option value="Event">{t('booking.reasonOptions.event')}</option>
                    <option value="Sports">{t('booking.reasonOptions.sports')}</option>
                    <option value="Other">{t('booking.reasonOptions.other')}</option>
                </Select>
            </FieldWrapper>

            <b>{t('booking.bookingDetailsTitle')}</b>
            <p className="text-gray-700 text-sm">
                {t('booking.bookingDetailsNote')}
            </p>

            <FieldWrapper label={t('booking.hotel')} name="hotel" required>
                <Controller
                    name="hotel"
                    control={control}
                    render={({ field }) => (
                        <Typeahead
                            id={'hotel'}
                            options={hotelOptions}
                            {...field}
                            placeholder={t('booking.hotelPlaceholder')}
                            error={errors.hotel?.message}
                        />
                    )}
                />
            </FieldWrapper>

            <div className="flex flex-col md:flex-row gap-4">
                <FieldWrapper label={t('booking.checkIn')} name="checkInDate" required>
                    <Input
                        type="date"
                        id={"checkInDate"}
                        min={today}
                        {...register('checkInDate')}
                        error={errors.checkInDate?.message}
                    />
                </FieldWrapper>

                <FieldWrapper label={t('booking.checkOut')} name="checkOutDate" required>
                    <Input
                        type="date"
                        id={"checkOutDate"}
                        min={minCheckOutDate}
                        {...register('checkOutDate')}
                        error={errors.checkOutDate?.message}
                    />
                </FieldWrapper>
            </div>

            <RadioGroup
                name="package"
                id={'package'}
                label={t('booking.package')}
                error={errors.package?.message}
                options={[
                    { label: t('booking.packageOptions.breakfast'), value: 'Premier Inn Breakfast' },
                    { label: t('booking.packageOptions.mealDeal'), value: 'Meal deal' }
                ]}
            />

            <button
                type="button"
                onClick={handleContinue}
                className="mt-4 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
            >
                {t('fields.continue')}
            </button>
        </div>
    );
}
