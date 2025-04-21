export interface GroupBookingPayload {
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  
    bookerType: string;
    stayPurpose: string;
    visitReason: string;
    hotel: string;
    isSchoolGroup?: boolean;
    packageType: string;
  
    checkInDate: string;
    checkOutDate: string;
  
    roomsSingle?: number;
    roomsDouble?: number;
    roomsTwin?: number;
  
    hasChildren?: boolean;
    needsAccessibleRoom?: boolean;
  
    family2?: number;
    family3A?: number;
    family3B?: number;
    family4?: number;
  
    accessibleSingle?: number;
    accessibleDouble?: number;
    accessibleTwin?: number;
  
    additionalInfo?: string;
    locale?: string;
  }
  