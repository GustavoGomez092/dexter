'use client'

import '../globals.css'
import { Inter } from 'next/font/google'
import ChallengeHeader from '../../components/ChallengeHeader'
import ChallengeFooter from '../../components/ChallengeFooter'
const inter = Inter({ subsets: ['latin'] })
import 'react-perfect-scrollbar/dist/css/styles.css';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <div className="challenge wrapper h-screen flex flex-col justify-between bg-gray-900">
          <ChallengeHeader />
          {children}
          <ChallengeFooter />
          </div>
  )
}
