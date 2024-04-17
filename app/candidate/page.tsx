'use client';

import { Spinner } from '@nextui-org/react';

export default function Page() {
  return (
    <main className='flex h-auto flex-col items-center justify-between py-6 lg:h-[80vh]'>
      <div className='container h-full flex-row gap-2 lg:flex'>
        <div className='container flex flex-col items-center justify-center gap-4'>
          <Spinner size='lg' />
        </div>
      </div>
    </main>
  );
}
