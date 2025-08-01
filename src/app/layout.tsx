import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { SidebarHeaderProvider } from "@/contexts/SidebarHeaderContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { PageTitleProvider } from "@/contexts/PageTitleContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import I18nClientProvider from "@/components/I18nClientProvider";
import QueryProvider from "@/providers/QueryProvider";
import ClerkProviderWrapper from "@/providers/ClerkProvider";
import ConvexClientProvider from "@/providers/ConvexProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harmonia",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <PageTitleProvider>
            <I18nClientProvider>
              <LanguageProvider>
                <ClerkProviderWrapper>
                  <ConvexClientProvider>
                    <QueryProvider>
                      <SidebarHeaderProvider>
                      <div className="flex h-screen">
                        <Sidebar />
                        <div className="flex flex-1 flex-col z-[1]">
                          <Header />
                          <main className="overflow-auto bg-background h-full p-2 sm:p-8 pb-24">
                            {children}
                          </main>
                        </div>
                      </div>
                    </SidebarHeaderProvider>
                  </QueryProvider>
                </ConvexClientProvider>
              </ClerkProviderWrapper>
              </LanguageProvider>
            </I18nClientProvider>
          </PageTitleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}