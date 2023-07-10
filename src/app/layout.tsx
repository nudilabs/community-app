import '@/styles/globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import NavBar from '@/components/nav-bar';
import { Footer } from '@/components/footer';
import ClientLayout from './Web3Provider';

type RootLayoutProps = {
  children: React.ReactNode;
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
              </div>
            </ClientLayout>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
