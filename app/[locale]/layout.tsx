// app/[locale]/layout.tsx

import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const SUPPORTED_LOCALES = ['en', 'de'];

export const metadata: Metadata = {
  title: 'Group Booking',
  description: 'Premier Inn Group Booking Form',
};

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale;

  if (!SUPPORTED_LOCALES.includes(locale)) {
    notFound();
  }

  return <>{children}</>;
}
