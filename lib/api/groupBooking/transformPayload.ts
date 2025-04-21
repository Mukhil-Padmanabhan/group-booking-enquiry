import type { GroupBookingFormValues } from '@/lib/validationSchemas';

export function transformGroupBookingPayload(body: GroupBookingFormValues) {
    return {
      title: body.title,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
  
      bookerType: body.bookerType,
      stayPurpose: body.stayPurpose,
      visitReason: body.visitReason,
      hotel: body.hotel,
      isSchoolGroup: !!body.isSchoolGroup,
      package: body.package,
  
      checkInDate: new Date(body.checkInDate),
      checkOutDate: new Date(body.checkOutDate),
  
      roomsSingle: body.roomsSingle ?? 0,
      roomsDouble: body.roomsDouble ?? 0,
      roomsTwin: body.roomsTwin ?? 0,
  
      hasChildren: !!body.hasChildren,
      needsAccessibleRoom: !!body.needsAccessibleRoom,
  
      family2: body.family2 ?? 0,
      family3A: body.family3A ?? 0,
      family3B: body.family3B ?? 0,
      family4: body.family4 ?? 0,
  
      accessibleSingle: body.accessibleSingle ?? 0,
      accessibleDouble: body.accessibleDouble ?? 0,
      accessibleTwin: body.accessibleTwin ?? 0,
  
      additionalInfo: body.additionalInfo || '',
      locale: body.locale || 'en'
    };
  }
  