import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import NavBar from "@/components/nav-bar";
import { Footer } from "@/components/footer";

import { ClerkProvider } from "@clerk/nextjs";
import ClientLayout from "./Web3Provider";

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
            <ClerkProvider
              appearance={{
                variables: {
                  colorPrimary: "#a855f7",
                  colorText: "white",
                  colorBackground: "#27272a",
                  colorAlphaShade: "white",
                  borderRadius: "6px",
                },
              }}
            >
              <ClientLayout>
                <div>
                  <NavBar />
                  {children}
                  <Footer />
                </div>
              </ClientLayout>
            </ClerkProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
