'use client'

import '../globals.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import 'react-perfect-scrollbar/dist/css/styles.css';
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useAuthVerifier } from '@/hooks/useAuthVerifier';
import { Spinner } from '@nextui-org/react';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { loading } = useAuthVerifier()

  return (
        <div className="challenge wrapper h-screen flex flex-col justify-between bg-gray-900 dark">
          <Header />
          {
            loading 
            ? <div className="container flex flex-col items-center justify-center gap-4">
                <Spinner size="lg" />
              </div>
            : children
          }
          <Footer />
          </div>
  )
}
