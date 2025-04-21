'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

const locales = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  const currentLocale = pathname?.split('/')[1];
  const restOfPath = pathname?.split('/').slice(2).join('/') ?? '';

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale !== currentLocale) {
      startTransition(() => {
        router.push(`/${newLocale}/${restOfPath}`);
      });
    }
  };

  return (
    <div className="mb-4 text-right">
      <select
        value={currentLocale}
        onChange={(e) => handleLocaleChange(e.target.value)}
        className="border p-2 rounded text-sm"
      >
        {locales.map((locale) => (
          <option key={locale.code} value={locale.code}>
            {locale.label}
          </option>
        ))}
      </select>
    </div>
  );
}
