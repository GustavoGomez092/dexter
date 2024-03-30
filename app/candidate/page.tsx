'use client'

import { Spinner } from "@nextui-org/react"


export default function Page() {
  return (
    <main className="flex h-auto lg:h-[80vh] flex-col items-center justify-between py-6">
    <div className="container flex-row lg:flex h-full gap-2">
    <div className="container flex flex-col items-center justify-center gap-4">
        <Spinner size="lg" />
      </div>
    </div>
  </main>
  )
}