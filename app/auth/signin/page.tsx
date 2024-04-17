'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Code, Input, Spinner } from '@nextui-org/react';
import PasswordInput from '@/components/PasswordInput';
import randomSnippetGenerator from '@/hooks/userRandomSnippetGenerator';
import {
  User,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '@/providers/firebase';
import { authStore } from '@/store/authStore';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function page() {
  const [snippet, setSnippet] = useState('');
  const { getRandomSnippet } = randomSnippetGenerator();
  const login = authStore((state) => state.logIn);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    setSnippet(getRandomSnippet());
  }, []);

  const checkCreds = () => {
    const emailSchema = z.string().email();
    const passwordSchema = z.string().min(6);
    try {
      const emailCheck = emailSchema.safeParse(email);
      const passwordCheck = passwordSchema.safeParse(password);

      if (!emailCheck.success) {
        throw new Error();
      }

      if (!passwordCheck.success) {
        throw new Error();
      }
    } catch (error) {
      throw new Error(
        'Invalid credentials, please check your email and password.'
      );
    }
  };

  const signInUserPass = async () => {
    try {
      setLoading(true);
      checkCreds();
      const user = await signInWithEmailAndPassword(auth, email, password);
      login(user as unknown as User);
      setLoading(false);
      router.push('/admin/challenges');
      setError('');
    } catch (error) {
      setLoading(false);
      setError('There was an error signing in, try again later.');
    }
  };

  const signInGoogle = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const signIn = await signInWithPopup(auth, provider);
      login(signIn.user as unknown as User);
      setLoading(false);
      router.push('/admin/challenges');
      setError('');
    } catch (error) {
      setLoading(false);
      setError('There was an error signing in, try again later.');
    }
  };

  return (
    <div className='flex min-h-screen justify-center text-text dark'>
      <div className='m-0 flex max-w-screen-xl flex-1 justify-center bg-base shadow sm:m-10 sm:rounded-lg'>
        <div className='p-6 sm:p-12 lg:w-1/2 xl:w-5/12'>
          <div className='relative mt-16 w-auto lg:mt-0'>
            <div className='logo-blur absolute right-32 top-6 h-6 w-36 rounded-full bg-teal-500 opacity-40 blur-xl' />
            <Image
              src='/assets/img/logo.svg'
              width='190'
              height='46'
              alt='logo'
              className='mx-auto w-6/12'
            />
          </div>
          <div className='mt-12 flex flex-col items-center'>
            <p className=''>Welcome interviewer</p>
            <h1 className='text-2xl font-extrabold xl:text-3xl'>Sign-in</h1>
            <div className='mt-8 w-full flex-1'>
              <div className='flex flex-col items-center gap-y-2'>
                <Button
                  disabled={loading}
                  onClick={() => signInGoogle()}
                  color='primary'
                  className='h-fit w-full max-w-xs scale-100 p-2 hover:scale-[102%]'
                  variant='bordered'
                >
                  <div className='rounded-full bg-white p-2'>
                    <svg className='w-4' viewBox='0 0 533.5 544.3'>
                      <path
                        d='M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z'
                        fill='#4285f4'
                      />
                      <path
                        d='M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z'
                        fill='#34a853'
                      />
                      <path
                        d='M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z'
                        fill='#fbbc04'
                      />
                      <path
                        d='M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z'
                        fill='#ea4335'
                      />
                    </svg>
                  </div>
                  <span className='ml-4'>Sign In with Google</span>
                </Button>
              </div>

              <div className='my-12 border-t border-primary text-center'>
                <div className='inline-block translate-y-1/2 transform px-2 text-sm leading-none text-text'>
                  Or sign In with e-mail
                </div>
              </div>
              <div className='mx-auto flex max-w-xs flex-col gap-y-2'>
                <Input
                  type='email'
                  isRequired
                  label='Email'
                  placeholder='Enter your email'
                  color='primary'
                  variant='bordered'
                  isInvalid={error ? true : false}
                  value={email || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                />
                <PasswordInput
                  type='password'
                  isRequired
                  label='Password'
                  placeholder='Enter your password'
                  color='primary'
                  variant='bordered'
                  isInvalid={error ? true : false}
                  value={password || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
                <Button
                  disabled={loading}
                  color='primary'
                  variant='shadow'
                  className='h-14 scale-100 hover:scale-[102%]'
                  onClick={() => signInUserPass()}
                >
                  <svg
                    className='-ml-2 h-6 w-6'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2' />
                    <circle cx='8.5' cy='7' r='4' />
                    <path d='M20 8v6M23 11h-6' />
                  </svg>
                  {loading ? (
                    <span className='ml-2'>
                      <Spinner color='white' />
                    </span>
                  ) : (
                    <span className='ml-3'>Sign In</span>
                  )}
                </Button>
                {error && (
                  <div className='alert mt-2 rounded-md border border-[#F31260] p-4'>
                    <p className='text-xs text-[#F31260]'>{error}</p>
                  </div>
                )}
                <p className='mt-6 text-center text-xs text-gray-600'>
                  Not a user yet?{' '}
                  <Link
                    className='underline'
                    href='mailto:gustavogomez092@gmail.com'
                  >
                    contact the admin
                  </Link>
                </p>
                <p className='text-center text-xs text-gray-600'>
                  Are you a candidate?{' '}
                  <Link className='underline' href='/auth/invite'>
                    Login here
                  </Link>
                </p>
                <p className='text-center text-xs text-gray-600'>
                  ⓒ Dexter. All Rights Reserved
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='relative hidden flex-1 items-center justify-center overflow-hidden bg-neutral text-center lg:flex'>
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
          <div className='code-section relative z-20 select-none text-left'>
            {snippet && (
              <Code className='whitespace-break-spaces' color='primary'>
                {snippet}
              </Code>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
