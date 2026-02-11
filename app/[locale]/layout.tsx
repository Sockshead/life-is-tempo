import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Bebas_Neue, JetBrains_Mono } from 'next/font/google';
import '../globals.css';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata = {
  title: 'Life Is Tempo - Where Training Meets Techno',
  description:
    'Personal chronicle of training for Berlin 70.3 from Colombia while living the techno scene. Real training, real parties, real talk.',
  openGraph: {
    title: 'Life Is Tempo',
    description: 'Training for Berlin 70.3 from Colombia. Where endurance meets underground techno.',
    type: 'website',
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body className={`${bebasNeue.variable} ${jetBrainsMono.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
