'use client'

import '../globals.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useCandidateAuthVerifier } from '@/hooks/useCandidateAuthVerifier'
import { Spinner } from '@nextui-org/react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  
  const { loading } = useCandidateAuthVerifier()

  return (
        <>
          {
            loading 
            ? <div className="container flex flex-col items-center justify-center gap-4 h-screen w-screen bg-neutral">
                <Spinner size="lg" />
              </div>
            : children
          }
          </>
  )
}
