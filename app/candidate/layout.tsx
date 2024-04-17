'use client';

import '@/app/globals.css';
import { useCandidateAuthVerifier } from '@/hooks/useCandidateAuthVerifier';
import { Spinner } from '@nextui-org/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useCandidateAuthVerifier();

  return (
    <>
      {loading ? (
        <div className='container flex h-screen w-screen flex-col items-center justify-center gap-4 bg-neutral'>
          <Spinner size='lg' />
        </div>
      ) : (
        children
      )}
    </>
  );
}
