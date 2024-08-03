import type { Metadata } from "next";
import "./globals.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { TimerProvider } from "@/contexts/TimerContext";
import { TextProvider } from "@/contexts/TextContext";
import Footer from "@/components/Footer";
import { I18nextProvider } from 'react-i18next';
import { ModelLoadedProvider } from '@/contexts/ModelLoadedContext';
import { Analytics } from "@vercel/analytics/react"
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
    <ModelLoadedProvider>
      <TimerProvider>
        <TextProvider>
          <html lang={locale}>
            <body className={`min-h-screen ${locale === 'ru' ? 'font-mono' : ''}`}>
              
                {children}
              
            </body>
          </html>
        </TextProvider>
      </TimerProvider>
    </ModelLoadedProvider>
    </NextIntlClientProvider>
  );
}
