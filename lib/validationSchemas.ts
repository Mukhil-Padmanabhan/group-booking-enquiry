import { z } from 'zod';

export type GroupBookingFormValues = z.infer<ReturnType<typeof getFullSchema>>;

export const getContactSchema = (t: (key: string) => string) =>
    z.object({
        title: z.string().min(1, { message: t('contactDetails.titleValidation') }),

        firstName: z.string().min(1, { message: t('contactDetails.firstNameValidation') }),

        lastName: z.string().min(1, { message: t('contactDetails.lastNameValidation') }),

        phone: z
            .string()
            .min(1, { message: t('contactDetails.invalidPhone') })
            .refine(
                (val) => /^\+?[0-9\s\-]{7,15}$/.test(val),
                { message: t('contactDetails.invalidPhone') }
            ),

        email: z
            .string()
            .min(1, { message: t('contactDetails.invalidEmail') })
            .email({ message: t('contactDetails.invalidEmail') })
    });


export const getBookingSchema = (t: (key: string) => string) =>
    z.object({
        bookerType: z
            .string({
                required_error: t('booking.bookerTypeRequired'),
                invalid_type_error: t('booking.bookerTypeRequired')
            })
            .min(1, { message: t('booking.bookerTypeRequired') }),

        companyName: z
            .string()
            .optional()
            .or(z.literal('').transform(() => undefined)),

        stayPurpose: z
            .string({
                required_error: t('booking.stayPurposeRequired'),
                invalid_type_error: t('booking.stayPurposeRequired')
            })
            .min(1, { message: t('booking.stayPurposeRequired') }),

        visitReason: z
            .string({
                required_error: t('booking.visitReasonRequired'),
                invalid_type_error: t('booking.visitReasonRequired')
            })
            .min(1, { message: t('booking.visitReasonRequired') }),

        hotel: z
            .string({
                required_error: t('booking.hotelRequired'),
                invalid_type_error: t('booking.hotelRequired')
            })
            .min(1, { message: t('booking.hotelRequired') }),

        checkInDate: z
            .string({
                required_error: t('booking.checkInRequired'),
                invalid_type_error: t('booking.checkInRequired')
            })
            .min(1, { message: t('booking.checkInRequired') }),

        checkOutDate: z
            .string({
                required_error: t('booking.checkOutRequired'),
                invalid_type_error: t('booking.checkOutRequired')
            })
            .min(1, { message: t('booking.checkOutRequired') }),

        package: z
            .string({
                required_error: t('booking.packageRequired'),
                invalid_type_error: t('booking.packageRequired')
            })
            .min(1, { message: t('booking.packageRequired') }),

        isSchoolGroup: z.boolean().optional()
    });


export const getRoomSchema = () =>
    z.object({
        roomsSingle: z.number().min(0).optional(),
        roomsDouble: z.number().min(0).optional(),
        roomsTwin: z.number().min(0).optional(),

        hasChildren: z.boolean().optional(),
        family2: z.number().min(0).optional(),
        family3A: z.number().min(0).optional(),
        family3B: z.number().min(0).optional(),
        family4: z.number().min(0).optional(),

        needsAccessibleRoom: z.boolean().optional(),
        accessibleSingle: z.number().min(0).optional(),
        accessibleDouble: z.number().min(0).optional(),
        accessibleTwin: z.number().min(0).optional(),

        additionalInfo: z.string().optional()
    });

export const getFullSchema = (t: (key: string) => string) =>
    getContactSchema(t)
        .merge(getBookingSchema(t))
        .merge(getRoomSchema()).extend({
            locale: z.string().min(1).default('en')
        });;