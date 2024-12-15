import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/globals.css';
import { StrictMode } from 'react';


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
          <main className='pt-32 pb-8'>
            {children}
          </main>
          <Footer/>
        </body>
      </html>
    </StrictMode>
  );
};