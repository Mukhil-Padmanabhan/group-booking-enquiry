import type { Metadata } from 'next';
import type { ReactNode } from 'react';


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Group Booking',
    description: 'Premier Inn Group Booking Form',
  };
}

export default function LocaleLayout({
  children,
}: {
  children: ReactNode;
  params: { locale: string };
}) {

  return (
    <div className="bg-white text-black antialiased">
      {children}
    </div>
  );
}
