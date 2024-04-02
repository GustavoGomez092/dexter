'use client'

import { applicantStore } from '@/store/applicantStore'
import { Spinner } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

export default function Page() {

  const inviteId = applicantStore((state: any) => state.inviteId)
  const router = useRouter()
  if (!inviteId) {
    router.push('/auth/invite')
  } else {
    router.push(`/candidate/challenge/${inviteId}/introduction`)
  }

  return (
    <div className="container flex flex-col items-center justify-center gap-4 h-screen w-screen bg-neutral">
      <Spinner size="lg" />
    </div>
  )
}