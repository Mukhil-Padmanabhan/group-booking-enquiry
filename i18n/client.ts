'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import en from '@/messages/en.json';
import de from '@/messages/de.json';

const dictionaries = { en, de };

type Dictionaries = typeof dictionaries['en'];

export function useTranslations() {
    const pathname = usePathname();

    const locale = useMemo(() => {
        const firstSegment = pathname?.split('/')[1];
        return ['en', 'de'].includes(firstSegment) ? firstSegment : 'en';
    }, [pathname]);

    const dict = useMemo(() => {
        return dictionaries[locale as keyof typeof dictionaries] as Dictionaries;
    }, [locale]);

    const t = (key: string): string => {
        return key.split('.').reduce((obj: any, part: string) => obj?.[part], dict) ?? key;
    };

    return t;
}
