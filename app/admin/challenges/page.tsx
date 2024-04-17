'use client';

import challenges from '@/tests';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import Link from 'next/link';
import ModalWindow from '@/components/ModalWindow';

export default function Page() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <main className='relative flex h-auto flex-col items-center justify-between py-6'>
      <ModalWindow isOpen={isOpen} onOpenChange={onOpenChange} />
      <div className='container h-full flex-row gap-2 lg:flex'>
        <div className='flex h-full w-full flex-col items-center justify-center'>
          <div className='top-0 mb-6 flex items-center self-start rounded-xl bg-black/30 p-6'>
            <div className='max-w-[350px]'>
              <h2 className='text-md mb-4 font-extrabold text-text'>
                Have an existing challenge code?
              </h2>
              <p className='text-text'>
                You can add an existing challenge code in order to review a
                previously completed challenge
              </p>
            </div>
            <Button onPress={onOpen} color='primary'>
              <span className='font-bold text-text'>Enter code</span>
            </Button>
          </div>
          <h2 className='mb-4 text-2xl font-extrabold text-text xl:text-3xl'>
            Challenges list
          </h2>
          <p className='mb-12 max-w-[600px] text-center text-text'>
            Here you'll find a list of all available challenges for the
            candidate. Once the candidate is ready to take the test, click on
            the "Start Test" button to get an invitation link for the candidate.
          </p>
          <div className='available-challenges flex flex-col'>
            {challenges.map((challenge, index) => (
              <div
                className='mb-10 flex flex-col items-center justify-center'
                key={`challenge-${index}`}
              >
                <h2 className='mb-6 text-2xl font-bold text-text'>
                  {' '}
                  {challenge.category}{' '}
                </h2>
                <div className='flex flex-row flex-wrap gap-6'>
                  {challenge.tests.map((test, indx) => (
                    <Card className='max-w-[400px]' key={`text-card-${indx}`}>
                      <CardHeader className='flex gap-3'>
                        <Image
                          alt='nextui logo'
                          height={40}
                          radius='sm'
                          src={challenge.icon}
                          width={40}
                        />
                        <div className='flex flex-col'>
                          <p className='text-md'>{test.name}</p>
                          <p className='text-small text-default-500'>
                            Questions: {test.questions.length} |{' '}
                            <span>Dificulty: {test.difficulty}/5</span>
                          </p>
                        </div>
                      </CardHeader>
                      <Divider />
                      <CardBody>
                        <p>{test.description}</p>
                      </CardBody>
                      <Divider />
                      <CardFooter>
                        <Link href={`/admin/challenges/${test.id}`}>
                          <Button color='primary'>Start Test</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
