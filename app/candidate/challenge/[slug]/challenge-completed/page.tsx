'use client';

import { applicantStore } from '@/store/applicantStore';
import { Button, Spinner } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const logOut = applicantStore((state: any) => state.logOut);
  const name = applicantStore((state: any) => state.name);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const finish = async () => {
    setLoading(true);
    logOut();
    setLoading(false);
    setTimeout(() => {
      router.push('/auth/invite');
    }, 1000);
  };

  return (
    <main className='flex h-full flex-col justify-center py-6 dark'>
      <div className='container h-full flex-col items-center justify-center gap-2 lg:flex'>
        <div className='inner-container flex max-w-[600px] flex-col items-center'>
          <h1 className='mb-6 text-center text-3xl font-bold text-text'>
            Thank you for completing this challenge {name}!
          </h1>
          <p className='mb-4 text-center text-text'>
            Congratulations are in order for completing the previous challenges
            today! Your dedication and perseverance have truly paid off,
            showcasing your remarkable skills and problem-solving abilities.
          </p>
          <p className='mb-8 text-center text-text'>
            As you celebrate this milestone, remember to take pride in your
            accomplishments and to continue pursuing excellence in all your
            endeavors. Your achievement today serves as a solid foundation for
            future parts of the hiring process. Keep up the fantastic work, and
            may your journey ahead be filled with even greater achievements and
            opportunities!
          </p>
          <Button color='primary' className='w-fit' disabled={loading}>
            <span className='font-bold text-text' onClick={() => finish()}>
              Finish
            </span>
            {loading && (
              <span className='ml-2'>
                <Spinner color='white' />
              </span>
            )}
          </Button>
        </div>
      </div>
    </main>
  );
}
