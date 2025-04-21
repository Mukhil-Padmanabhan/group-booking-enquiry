import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Premier Inn Group Booking',
  description: 'Premier Inn group booking enquiry form',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-black antialiased">
        {children}
      </body>
    </html>
  );
}
