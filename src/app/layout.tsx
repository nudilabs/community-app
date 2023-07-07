import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import NavBar from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { QuestBoard } from "@/components/quest-board";
import { ClerkProvider } from "@clerk/nextjs";

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
                },
              }}
            >
              <div>
                <NavBar />
                {children}
                <Footer />
                {/* <div className="fixed bottom-10 right-10">
                <QuestBoard />
              </div> */}
              </div>
            </ClerkProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
