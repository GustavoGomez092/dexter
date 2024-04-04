'use client'

import { applicantStore } from "@/store/applicantStore"
import { Button } from "@nextui-org/react"
import Link from "next/link"

export default function Page({ params }: { params: { slug: string } }) {

  const name = applicantStore((state: any) => state.name)

  return (
    <main className="flex h-full flex-col justify-center py-6 dark">
    <div className="container flex-col lg:flex h-full gap-2 items-center justify-center">
      <div className="inner-container max-w-[600px] flex flex-col items-center">
        <h1 className="text-text text-3xl font-bold text-center mb-6">Welcome to Dexter {name}!</h1>
        <p className='text-text text-center mb-4'>
          We're thrilled to have you here as you embark on this exciting
          journey to showcase your skills and expertise. This platform is designed to provide you with an immersive
          and insightful experience as you tackle different challenges tailored to assess your abilities.
        </p>
        <p className='text-text text-center mb-4'>   
          As you navigate through the test, remember to stay focused, take your time to analyze each problem
          carefully, and demonstrate your problem-solving prowess. This is your opportunity to shine and
          demonstrate your proficiency in a supportive and conducive environment.
        </p>
        <p className='text-text text-center mb-8'>
          We believe in your potential and are eager to witness the remarkable solutions you'll craft. So,
          without further ado, let's dive in and embark on this adventure together. 
          Best of luck, and may your answers pave the way to success!
        </p>
        <Link href={`/candidate/challenge/${params.slug}/`}>
          <Button color="primary" className="w-fit">
            <span className="text-text font-bold">Start Challenge!</span>
          </Button>
        </Link>
      </div>
    </div>
  </main>
  )
}