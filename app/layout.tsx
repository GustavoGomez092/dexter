'use client'

import './globals.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import 'react-perfect-scrollbar/dist/css/styles.css';
import {NextUIProvider} from "@nextui-org/react";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="main light wrapper h-auto flex flex-col justify-between text-base-100">
        <NextUIProvider>
          {children}
          </NextUIProvider>
          </main>
      </body>
    </html>
  )
}
