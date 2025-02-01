import type { Metadata } from 'next';
import { StrictMode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/globals.css';


export const metadata: Metadata = {
  title: 'Note App',
  description: 'Note App',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StrictMode>
      <html
        lang='ZH-Hant-TW'
        suppressHydrationWarning={false}
      >
        <body>
          <Header/>
          <main className='min-h-[calc(100vh-32px-var(--header-h))] py-8'>
            {children}
          </main>
          <Footer/>
        </body>
      </html>
    </StrictMode>
  );
};