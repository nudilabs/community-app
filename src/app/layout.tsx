import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import NavBar from "@/components/nav-bar";

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
            <div>
              <NavBar />
              {children}
            </div>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
