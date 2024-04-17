'use client'

import ChallengeHeader from '../../../../components/ChallengeHeader'
import ChallengeFooter from '../../../../components/ChallengeFooter'



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
        <div className="challenge wrapper min-h-screen flex flex-col justify-between bg-gray-900">
          <ChallengeHeader />
          {children}
          <ChallengeFooter />
          </div>
  )
}
