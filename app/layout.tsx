import './globals.css';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white text-black antialiased`}>
        <Toaster richColors closeButton position="top-center"/>
        {children}
      </body>
    </html>
  );
}
