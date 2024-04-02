'use client'

import { Spinner } from "@nextui-org/react"
import { useRouter } from "next/navigation"

export default function Page() {

  const router = useRouter()

  router.push('/admin/challenges')

  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-between py-6">
    <div className="container flex-row lg:flex h-full gap-2">
    <div className="container flex flex-col items-center justify-center gap-4">
        <Spinner size="lg" />
      </div>
    </div>
  </main>
  )
}