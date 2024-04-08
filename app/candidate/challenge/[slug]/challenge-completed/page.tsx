'use client'

import { applicantStore } from "@/store/applicantStore"
import { Button, Spinner } from "@nextui-org/react"
import { useRouter } from 'next/navigation'
import { useState } from "react"

export default function Page() {

  const logOut = applicantStore((state: any) => state.logOut)
  const name = applicantStore((state: any) => state.name)
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const finish = async () => {
    setLoading(true)
    logOut()
    setLoading(false)
    setTimeout(() => {
      router.push('/auth/invite')
    }, 1000)
  }

  return (
    <main className="flex h-full flex-col justify-center py-6 dark">
    <div className="container flex-col lg:flex h-full gap-2 items-center justify-center">
      <div className="inner-container max-w-[600px] flex flex-col items-center">
        <h1 className="text-text text-3xl font-bold text-center mb-6">Thank you for completing this challenge {name}!</h1>
        <p className='text-text text-center mb-4'>
        Congratulations are in order for completing the previous challenges today! Your dedication and perseverance
        have truly paid off, showcasing your remarkable skills and problem-solving abilities. 
        </p>
        <p className='text-text text-center mb-8'>
        As you celebrate this milestone, remember to take pride in your accomplishments 
        and to continue pursuing excellence in all your endeavors. Your achievement today serves as a solid 
        foundation for future parts of the hiring process. Keep up the fantastic work, and may your journey ahead be filled 
        with even greater achievements and opportunities!
        </p>
        <Button color="primary" className="w-fit" disabled={loading}>
          <span className="text-text font-bold" onClick={() => finish()}>Finish</span>
          {
            loading &&
            <span className="ml-2"><Spinner color='white' /></span>
          }
        </Button>
      </div>
    </div>
  </main>
  )
}