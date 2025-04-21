'use client';

import { useCallback } from 'react';

const STORAGE_KEY = 'groupBookingDraft';

export const useDraftStorage = () => {
  const saveSection = useCallback((section: string, data: any) => {
    if (typeof window === 'undefined') return;

    const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    current[section] = data;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  }, []);

  const loadSection = useCallback((section: string) => {
    if (typeof window === 'undefined') return null;

    const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return current[section] || null;
  }, []);

  const clearDraft = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);


  const getProgress = useCallback(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');

    const sections = {
      contact: ['title', 'firstName', 'lastName', 'phone', 'email'],
      booking: ['bookerType', 'stayPurpose', 'visitReason', 'hotel', 'checkInDate', 'checkOutDate', 'package'],
      rooms: [
        'roomsSingle', 'roomsDouble', 'roomsTwin',
        'family2', 'family3A', 'family3B', 'family4',
        'accessibleSingle', 'accessibleDouble', 'accessibleTwin'
      ]
    };

    let filledSections = 0;

    for (const [section, fields] of Object.entries(sections)) {
      const hasAnyFieldFilled = fields.some((field) => {
        const value = saved[field];
        return value !== undefined && value !== '' && value !== 0 && value !== false;
      });

      if (hasAnyFieldFilled) filledSections++;
    }

    return Math.round((filledSections / Object.keys(sections).length) * 100);
  }, []);


  return { saveSection, loadSection, clearDraft, getProgress };
};
