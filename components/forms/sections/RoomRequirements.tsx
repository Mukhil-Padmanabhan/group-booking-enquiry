'use client';

import { useState, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { GroupBookingFormValues } from '../GroupBookingForm';
import Checkbox from '@/components/ui/Checkbox';
import CounterInput from '@/components/ui/CounterInput';
import FieldWrapper from '@/components/ui/FieldWrapper';
import Textarea from '@/components/ui/Textarea';
import { useTranslations } from '@/i18n/client';
import { useFormErrorContext } from '@/contexts/FormErrorContext';
import { useDraftStorage } from '@/hooks/useDraftStorage';

const getNumber = (value: unknown): number =>
    typeof value === 'number' ? value : parseInt(value as string) || 0;

type Props = {
    onContinue?: () => void;
};

export default function RoomRequirements({ onContinue }: Props) {
    const t = useTranslations();
    const { setSectionError } = useFormErrorContext();
    const { saveSection } = useDraftStorage();
    const [customError, setCustomError] = useState<string | null>(null);

    const {
        register,
        setValue,
        control,
        trigger,
        formState: { errors },
        getValues,
    } = useFormContext<GroupBookingFormValues>();

    const watchFields = useWatch<GroupBookingFormValues>({ control });

    useEffect(() => {
        if (!watchFields.hasChildren) {
            setValue('family2', 0);
            setValue('family3A', 0);
            setValue('family3B', 0);
            setValue('family4', 0);
        }
    }, [watchFields.hasChildren, setValue]);

    useEffect(() => {
        if (!watchFields.needsAccessibleRoom) {
            setValue('accessibleSingle', 0);
            setValue('accessibleDouble', 0);
            setValue('accessibleTwin', 0);
        }
    }, [watchFields.needsAccessibleRoom, setValue]);

    const handleContinue = async () => {
        setCustomError(null);
        saveSection('group', getValues());
        const {
            roomsSingle,
            roomsDouble,
            roomsTwin,
            family2,
            family3A,
            family3B,
            family4,
            accessibleSingle,
            accessibleDouble,
            accessibleTwin,
            hasChildren,
            needsAccessibleRoom,
        } = getValues();

        const standardRooms = getNumber(roomsSingle) + getNumber(roomsDouble) + getNumber(roomsTwin);
        const familyRooms = getNumber(family2) + getNumber(family3A) + getNumber(family3B) + getNumber(family4);
        const accessibleRooms = getNumber(accessibleSingle) + getNumber(accessibleDouble) + getNumber(accessibleTwin);

        if (hasChildren && familyRooms === 0) {
            setCustomError(t('room.familyRequirement'));
            setSectionError('rooms', true);
            return;
        }

        if (needsAccessibleRoom && accessibleRooms === 0) {
            setCustomError(t('room.accessibleRequirement'));
            setSectionError('rooms', true);
            return;
        }

        if (!hasChildren && !needsAccessibleRoom && standardRooms === 0) {
            setCustomError(t('room.standardRequirement'));
            setSectionError('rooms', true);
            return;
        }

        const valid = await trigger([
            'roomsSingle',
            'roomsDouble',
            'roomsTwin',
            'family2',
            'family3A',
            'family3B',
            'family4',
            'accessibleSingle',
            'accessibleDouble',
            'accessibleTwin',
            'additionalInfo',
        ]);

        setSectionError('rooms', !valid);

        if (!valid) { return } else { onContinue?.(); };

    };

    const totalRooms =
        getNumber(watchFields.roomsSingle) +
        getNumber(watchFields.roomsDouble) +
        getNumber(watchFields.roomsTwin) +
        getNumber(watchFields.family2) +
        getNumber(watchFields.family3A) +
        getNumber(watchFields.family3B) +
        getNumber(watchFields.family4) +
        getNumber(watchFields.accessibleSingle) +
        getNumber(watchFields.accessibleDouble) +
        getNumber(watchFields.accessibleTwin);

    return (
        <div className="space-y-6 text-black">
            <span className="text-sm text-gray-700">{t('room.description')}</span><br />
            <div className='mb-4'><a className="underline text-sm" href="https://www.premierinn.com/gb/en/sleep/our-rooms.html">{t('fields.seeRoomTypes')}</a></div>
            <div className="space-y-4">
                <CounterInput
                    label={t('room.single')}
                    description={t('room.singleDescription')}
                    value={getNumber(watchFields.roomsSingle)}
                    onChange={(val) => setValue('roomsSingle', val)}
                />
                <CounterInput
                    label={t('room.double')}
                    description={t('room.doubleDescription')}
                    value={getNumber(watchFields.roomsDouble)}
                    onChange={(val) => setValue('roomsDouble', val)}
                />
                <CounterInput
                    label={t('room.twin')}
                    description={t('room.twinDescription')}
                    value={getNumber(watchFields.roomsTwin)}
                    onChange={(val) => setValue('roomsTwin', val)}
                />
            </div>

            <Checkbox id={'hasChildren'} {...register('hasChildren')} label={t('room.hasChildren')} />
            {watchFields.hasChildren && (
                <div className="space-y-4">
                    <span>{t('fields.childRoomRule')}</span>
                    <div className='mb-4'><a href="https://www.premierinn.com/gb/en/terms/booking-terms-and-conditions.html" className='underline text-sm'>{t('fields.readOccupancy')}</a></div>
                    <CounterInput
                        label={t('room.family2')}
                        description={t('room.family2Description')}
                        value={getNumber(watchFields.family2)}
                        onChange={(val) => setValue('family2', val)}
                        error={errors.family2?.message}
                    />
                    <CounterInput
                        label={t('room.family3A')}
                        description={t('room.family3ADescription')}
                        value={getNumber(watchFields.family3A)}
                        onChange={(val) => setValue('family3A', val)}
                        error={errors.family3A?.message}
                    />
                    <CounterInput
                        label={t('room.family3B')}
                        description={t('room.family3BDescription')}
                        value={getNumber(watchFields.family3B)}
                        onChange={(val) => setValue('family3B', val)}
                        error={errors.family3B?.message}
                    />
                    <CounterInput
                        label={t('room.family4')}
                        description={t('room.family4Description')}
                        value={getNumber(watchFields.family4)}
                        onChange={(val) => setValue('family4', val)}
                        error={errors.family4?.message}
                    />
                </div>
            )}

            <Checkbox {...register('needsAccessibleRoom')} id={'needsAccessibleRoom'} label={t('room.needsAccessibleRoom')} />
            {watchFields.needsAccessibleRoom && (
                <div className="space-y-4">
                    <CounterInput
                        label={t('room.accessibleSingle')}
                        description={t('room.accessibleSingleDescription')}
                        value={getNumber(watchFields.accessibleSingle)}
                        onChange={(val) => setValue('accessibleSingle', val)}
                        error={errors.accessibleSingle?.message}
                    />
                    <CounterInput
                        label={t('room.accessibleDouble')}
                        description={t('room.accessibleDoubleDescription')}
                        value={getNumber(watchFields.accessibleDouble)}
                        onChange={(val) => setValue('accessibleDouble', val)}
                        error={errors.accessibleDouble?.message}
                    />
                    <CounterInput
                        label={t('room.accessibleTwin')}
                        description={t('room.accessibleTwinDescription')}
                        value={getNumber(watchFields.accessibleTwin)}
                        onChange={(val) => setValue('accessibleTwin', val)}
                        error={errors.accessibleTwin?.message}
                    />
                </div>
            )}

            <div className="mt-4 text-lg font-medium">
                {t('room.total')}: {totalRooms} {t('room.rooms')}
            </div>

            <FieldWrapper label={t('fields.additionalInfo')} name="additionalInfo">
                <div className='className="block mb-4 text-sm text-gray-00"'>{t('fields.additionalInfoDescription')}</div>
                <Textarea
                    rows={4}
                    {...register('additionalInfo')}
                    placeholder={t('placeholders.additionalInfo')}
                />
            </FieldWrapper>

            {customError && (
                <p className="text-red-600 text-sm mt-2 font-medium">{customError}</p>
            )}

            <button
                type="button"
                className="mt-4 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
                onClick={handleContinue}
            >
                {t('fields.continue')}
            </button>
        </div>
    );
}
