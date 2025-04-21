'use client';

import { GroupBookingFormValues } from '@/components/forms/GroupBookingForm';

export const useSubmitGroupBooking = () => {
  const submitBooking = async (data: GroupBookingFormValues) => {
    const res = await fetch('/api/groups/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || 'Something went wrong');
    }

    return result;
  };

  return { submitBooking };
};
