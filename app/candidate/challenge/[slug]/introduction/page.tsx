'use client';

import { applicantStore } from '@/store/applicantStore';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

export default function Page({ params }: { params: { slug: string } }) {
  const name = applicantStore((state: any) => state.name);

  return (
    <main className='flex h-full flex-col justify-center py-6 dark'>
      <div className='container h-full flex-col items-center justify-center gap-2 lg:flex'>
        <div className='inner-container flex max-w-[600px] flex-col items-center'>
          <h1 className='mb-6 text-center text-3xl font-bold text-text'>
            Welcome to Dexter {name}!
          </h1>
          <p className='mb-4 text-center text-text'>
            We're thrilled to have you here as you embark on this exciting
            journey to showcase your skills and expertise. This platform is
            designed to provide you with an immersive and insightful experience
            as you tackle different challenges tailored to assess your
            abilities.
          </p>
          <p className='mb-4 text-center text-text'>
            As you navigate through the test, remember to stay focused, take
            your time to analyze each problem carefully, and demonstrate your
            problem-solving prowess. This is your opportunity to shine and
            demonstrate your proficiency in a supportive and conducive
            environment.
          </p>
          <p className='mb-8 text-center text-text'>
            We believe in your potential and are eager to witness the remarkable
            solutions you'll craft. So, without further ado, let's dive in and
            embark on this adventure together. Best of luck, and may your
            answers pave the way to success!
          </p>
          <Link href={`/candidate/challenge/${params.slug}/`}>
            <Button color='primary' className='w-fit'>
              <span className='font-bold text-text'>Start Challenge!</span>
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
