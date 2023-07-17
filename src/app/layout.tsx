import '@/styles/globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import NavBar from '@/components/nav-bar';
import { Footer } from '@/components/footer';
import ClientLayout from './Web3Provider';
import { Analytics } from '@vercel/analytics/react';

type RootLayoutProps = {
  children: React.ReactNode;
};

import { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: {
    template: '%s | 3MPOWER',
    default: '3MPOWER',
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <ClientLayout>
              <div>
                <NavBar />
                {children}
                <Footer />
                <Toaster />
                <Analytics />
              </div>
            </ClientLayout>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
