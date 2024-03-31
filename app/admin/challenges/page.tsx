'use client'

import challenges from '@/tests'
import {Card, CardHeader, CardBody, CardFooter, Divider, Image, Button} from "@nextui-org/react";
import Link from 'next/link'

export default function Page() {
  return (
    <main className="flex h-auto flex-col items-center justify-between py-6">
    <div className="container flex-row lg:flex h-full gap-2">
    <div className="h-full w-full flex flex-col items-center justify-center">
        <h1 className="text-text text-2xl xl:text-3xl font-extrabold mb-4">Challenges list</h1>
        <p className="max-w-[600px] text-text text-center mb-12">Here you'll find a list of all available challenges for the candidate. Once the candidate is ready to take the test, click on the "Start Test" button to get an invitation link for the candidate.</p>
        <div className="available-challenges flex flex-col">
          {
            challenges.map((challenge, index) => (
              <div className="flex flex-col items-center justify-center mb-10" key={`challenge-${index}`}>
                <h2 className='text-2xl text-text font-bold mb-6'> {challenge.category} </h2>
                <div className="flex flex-row flex-wrap gap-6">
                  {
                    challenge.tests.map((test, indx) => (
                      <Card className="max-w-[400px]" key={`text-card-${indx}`}>
                        <CardHeader className="flex gap-3">
                          <Image
                            alt="nextui logo"
                            height={40}
                            radius="sm"
                            src={challenge.icon}
                            width={40}
                          />
                          <div className="flex flex-col">
                            <p className="text-md">{test.name}</p>
                            <p className="text-small text-default-500">Questions: {test.questions.length} | <span>Dificulty: {test.difficulty}/5</span></p>
                          </div>
                        </CardHeader>
                        <Divider/>
                        <CardBody>
                          <p>{test.description}</p>
                        </CardBody>
                        <Divider/>
                        <CardFooter>
                          <Link href={`/admin/challenges/${test.id}`}>
                            <Button color='primary'>
                            Start Test
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    ))
                  }
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  </main>
  )
}