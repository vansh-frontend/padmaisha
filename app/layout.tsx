import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppProvider } from '@/contexts/AppContext';
import { Toaster } from 'sonner';
import Navbar from '@/components/Navbar';
import NotificationBar from '@/components/NotificationBarClient';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Padmaisha - B2B Fashion for Retailers',
  description: 'Premium B2B Clothing for Retailers – Exclusive Brands, Affordable Prices',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <Navbar />
          {children}
          <NotificationBar />
          <Toaster position="top-right" />
        </AppProvider>
      </body>
    </html>
  );
}