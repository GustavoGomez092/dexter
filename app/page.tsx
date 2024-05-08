'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Spinner } from '@nextui-org/react';
import { useAuthVerifier } from '@/hooks/useAuthVerifier';
import { redirect } from 'next/navigation';
import { authStore } from '@/store/authStore';

export default function Home() {
  useAuthVerifier();
  const userData = authStore((state) => state.user);
  if (userData) {
    redirect('/admin/challenges');
  }

  return (
    <main className='flex h-screen w-screen flex-col items-center justify-between bg-gray-900 dark'>
      <Header />
      <div className='container flex flex-col items-center justify-center gap-4'>
        <Spinner size='lg' />
      </div>
      <Footer />
    </main>
  );
}
