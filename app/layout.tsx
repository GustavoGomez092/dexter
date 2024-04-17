'use client';

import '@/app/globals.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import { NextUIProvider } from '@nextui-org/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <title>Dexter</title>
        <meta name='description' content='Code Challenges for Job applicants' />
        <link rel='icon' href='/favicon.ico' sizes='any' />
      </head>
      <body className={inter.className}>
        <main className='main wrapper text-base-100 flex h-auto flex-col justify-between light'>
          <NextUIProvider>{children}</NextUIProvider>
        </main>
      </body>
    </html>
  );
}
