import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });
export const revalidate = 60;
export const metadata: Metadata = {
  title: 'Group Booking',
  description: 'Premier Inn Group Booking Form',
};

const SUPPORTED_LOCALES = ['en', 'de'];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!SUPPORTED_LOCALES.includes(locale)) {
    notFound(); 
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.className} bg-white text-black antialiased`}>
        {children}
      </body>
    </html>
  );
}
