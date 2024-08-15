import "@/styles/globals.css";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "@/components/theme-provider";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { NavigationMenu } from "@/components/integration/navigation-menu";

export const metadata: Metadata = {
  title: "Boscholt Orders",
  description: "Order your dairy production from Boscholt",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{ children: React.ReactNode; params: { locale: string } }>) {
  const messages = await getMessages();
  console.log(messages);
  return (
    <html lang={locale} className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextIntlClientProvider messages={messages}>
              <header className="sticky top-0 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <NavigationMenu />
              </header>
              {children}
            </NextIntlClientProvider>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
