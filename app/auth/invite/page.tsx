'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Code, Input, Spinner } from '@nextui-org/react';
import randomSnippetGenerator from '../../../hooks/userRandomSnippetGenerator';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { applicantStore } from '@/store/applicantStore';
import db, { auth } from '@/providers/firebase';
import { signInAnonymously } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { challengeStore } from '@/store/challengeStore';
import Image from 'next/image';

export default function page() {
  const [snippet, setSnippet] = useState('');
  const { getRandomSnippet } = randomSnippetGenerator();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [inviteCodeError, setInviteCodeError] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const applicantLogin = applicantStore((state) => state.logIn);
  const clearChallenge = challengeStore((state: any) => state.clearChallenge);

  useEffect(() => {
    setSnippet(getRandomSnippet());
    const clearing = async () => {
      await clearChallenge();
    };
    clearing();
  }, []);

  const checkCreds = async () => {
    const emailSchema = z.string().email();
    const nameSchema = z.string().min(3);
    const inviteCodeSchema = z.string().min(10).max(10);
    const emailEval = await emailSchema.safeParseAsync(email);
    const nameEval = await nameSchema.safeParseAsync(name);
    const inviteCodeEval = await inviteCodeSchema.safeParseAsync(inviteCode);

    if (!emailEval.success) {
      setEmailError(true);
      throw new Error('Invalid email address');
    } else {
      setEmailError(false);
    }

    if (!nameEval.success) {
      setNameError(true);
      throw new Error('Invalid name');
    } else {
      setNameError(false);
    }

    if (!inviteCodeEval.success) {
      setInviteCodeError(true);
      throw new Error('Invalid invite code');
    } else {
      setInviteCodeError(false);
    }
  };

  const signInCandidate = async () => {
    try {
      setLoading(true);
      await checkCreds();
      applicantLogin({ name, email, inviteId: inviteCode, loading: false });
      await checkValidInviteCode();
      await anonymusLogin();
      await setUserData();
      setLoading(false);
      router.push(`/candidate/challenge/${inviteCode}/introduction`);
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  };

  const checkValidInviteCode = async () => {
    const challenge = doc(db, 'Challenge', inviteCode);
    const docSnap = await getDoc(challenge);

    if (docSnap.exists()) {
      if (docSnap.data()?.started) {
        setInviteCodeError(true);
        throw new Error('Invite code already used');
      } else {
        setInviteCodeError(false);
        setError('');
        return true;
      }
    } else {
      setInviteCodeError(true);
      throw new Error('Invalid invite code');
    }
  };

  const setUserData = async () => {
    const document = doc(db, 'Challenge', inviteCode);
    await updateDoc(document, {
      name: name,
      email: email,
      started: true,
    });
  };

  const anonymusLogin = async () => {
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.log(error);
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
            <p>Welcome Applicant</p>
            <h1 className='text-2xl font-extrabold xl:text-3xl'>
              Start your test here:
            </h1>
            <div className='mt-8 w-full flex-1'>
              <div className='mx-auto flex max-w-xs flex-col gap-y-2'>
                <Input
                  type='email'
                  isRequired
                  label='Email'
                  placeholder='Enter your email'
                  color='primary'
                  variant='bordered'
                  isInvalid={emailError}
                  value={email || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                />
                <Input
                  type='text'
                  isRequired
                  label='name'
                  placeholder='Enter your name'
                  color='primary'
                  variant='bordered'
                  className='mb-2'
                  isInvalid={nameError}
                  value={name || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                />
                <Input
                  type='text'
                  isRequired
                  label='invite-code'
                  placeholder='Paste your invite code here....'
                  color='primary'
                  variant='bordered'
                  className='mb-2'
                  isInvalid={inviteCodeError}
                  value={inviteCode || ''}
                  onChange={(e) => setInviteCode(e.target.value)}
                />
                <Button
                  color='primary'
                  variant='shadow'
                  disabled={loading}
                  className='h-14 scale-100 hover:scale-[102%]'
                  onClick={() => signInCandidate()}
                >
                  <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24'>
                    <path
                      className='stroke-text'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M11 6h10m-10 6h10m-10 6h10M3 11.945 4.538 13.5 8 10M3 5.944 4.538 7.5 8 4M4.5 18h.01M5 18a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z'
                    />
                  </svg>
                  {loading ? (
                    <span className='ml-2'>
                      <Spinner color='white' />
                    </span>
                  ) : (
                    <span className='ml-3'>Start Test</span>
                  )}
                </Button>
                {error && (
                  <div className='alert mt-2 rounded-md border border-[#F31260] p-4'>
                    <p className='text-xs text-[#F31260]'>{error}</p>
                  </div>
                )}
                <p className='mt-6 text-center text-xs text-gray-600'>
                  Are you an Interviewer?{' '}
                  <Link className='underline' href='/auth/signin'>
                    Sign In
                  </Link>
                </p>
                <p className='text-center text-xs text-gray-600'>
                  By clicking the "Start Test" button you agree to abide by
                  Dexter's{' '}
                  <a
                    href='#'
                    className='border-b border-dotted border-gray-500'
                  >
                    Terms of Service
                  </a>{' '}
                  and its{' '}
                  <a
                    href='#'
                    className='border-b border-dotted border-gray-500'
                  >
                    Privacy Policy
                  </a>
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
