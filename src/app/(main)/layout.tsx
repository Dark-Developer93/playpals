import type { Metadata } from 'next';
import localFont from 'next/font/local';

import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Provider from '@/components/provider/Provider';
import { Toaster } from '@/components/ui/toaster';
import '../globals.css';

const viuFont = localFont({
  src: '../../../public/assets/fonts/HelveticaNowDisplay.otf',
  variable: '--font-HelveticaNowDisplay',
});

export const metadata: Metadata = {
  title: 'PlayPals',
  description: 'PlayPals is a your fun platform for games match prediction',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${viuFont.variable} flex min-h-screen flex-col justify-between gap-8 md:gap-16 font-viuFont`}
      >
        <Provider>
          <Header />
          <main className="md:container">
            {children}
            <Toaster />
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
