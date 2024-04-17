'use client'

import '@/app/globals.css'
import { useCandidateAuthVerifier } from '@/hooks/useCandidateAuthVerifier'
import { Spinner } from '@nextui-org/react'



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
