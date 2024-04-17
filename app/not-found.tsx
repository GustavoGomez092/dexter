'use client';

import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { Link } from '@nextui-org/react';

export default function notFound() {
  const router = useRouter();
  return (
    <div className='relative h-screen w-screen overflow-hidden bg-neutral dark'>
      <div className='container relative z-10 mx-auto flex h-full items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-9xl font-bold text-text lg:text-[180px]'>404</h1>
          <h2 className='text-2xl font-bold text-text'>Page Not Found</h2>
          <div className='internal-links mt-3 flex justify-center gap-x-4'>
            <Link
              underline='always'
              className='cursor-pointer'
              onClick={() => router.back()}
            >
              Go back
            </Link>
            <NextLink
              className='text-primary underline underline-offset-4'
              href='/'
            >
              Go Home
            </NextLink>
          </div>
        </div>
      </div>
      <div className='absolute left-0 top-0 z-0 h-full w-full overflow-hidden'>
        <div className='absolute left-0 z-20 h-full w-full bg-gradient-radial from-gray-900/0 to-gray-900/100' />
        <div className='square absolute bottom-32 right-32 flex h-[101px] w-[101px] items-center justify-center'>
          <div className='delayed-counter-rotation-animation absolute h-[145%] w-[145%] rounded-full bg-gradient-conic from-transparent from-10% via-red-400 via-50%  to-transparent to-50%' />
          <div className='absolute mx-auto my-auto h-full w-full bg-gray-900' />
          <div className='absolute mx-auto my-auto h-full w-full bg-transparent outline outline-[90px] outline-offset-1 outline-gray-900' />
        </div>
        <div className='square absolute left-60 top-60 flex h-[301px] w-[301px] items-center justify-center'>
          <div className='rotation-animation absolute h-[150%] w-[150%] rounded-full bg-gradient-conic from-transparent from-80% via-green-400 via-80% to-transparent' />
          <div className='absolute mx-auto my-auto h-full w-full bg-gray-900' />
          <div className='absolute mx-auto my-auto h-full w-full bg-transparent outline outline-[100px] outline-offset-1 outline-gray-900' />
        </div>
        <div className='square absolute left-[120px] top-[120px] flex h-[101px] w-[101px] items-center justify-center'>
          <div className='counter-rotation-animation absolute h-[145%] w-[145%] rounded-full bg-gradient-conic from-transparent from-10% via-blue-400 via-50% to-transparent to-50%' />
          <div className='absolute mx-auto my-auto h-full w-full bg-gray-900' />
          <div className='absolute mx-auto my-auto h-full w-full bg-transparent outline outline-[90px] outline-offset-1 outline-gray-900' />
        </div>
        <div className='square absolute bottom-[10px] left-0 flex h-[201px] w-[201px] items-center justify-center'>
          <div className='counter-rotation-animation absolute h-[145%] w-[145%] rounded-full bg-gradient-conic from-transparent from-10% via-yellow-400 via-50% to-transparent to-50%' />
          <div className='absolute mx-auto my-auto h-full w-full bg-gray-900' />
          <div className='absolute mx-auto my-auto h-full w-full bg-transparent outline outline-[90px] outline-offset-1 outline-gray-900' />
        </div>
        <div className='square absolute -top-[70px] right-10 flex h-[151px] w-[151px] items-center justify-center'>
          <div className='counter-rotation-animation absolute h-[145%] w-[145%] rounded-full bg-gradient-conic from-transparent from-10% via-purple-400 via-50% to-transparent to-50%' />
          <div className='absolute mx-auto my-auto h-full w-full bg-gray-900' />
          <div className='absolute mx-auto my-auto h-full w-full bg-transparent outline outline-[90px] outline-offset-1 outline-gray-900' />
        </div>
        <div className='header absolute z-10 m-0 h-full w-full bg-cover' />
      </div>
    </div>
  );
}
