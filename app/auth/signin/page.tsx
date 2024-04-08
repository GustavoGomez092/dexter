'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {Button, Code, Input, Spinner} from "@nextui-org/react";
import PasswordInput from "@/components/PasswordInput"
import randomSnippetGenerator from "@/hooks/userRandomSnippetGenerator"
import { User, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '@/providers/firebase';
import { authStore } from '@/store/authStore';
import { z } from "zod";
import { useRouter } from 'next/navigation';

export default function page() {

  const [snippet, setSnippet] = useState('')
  const {getRandomSnippet} = randomSnippetGenerator()
  const login = authStore((state)=> state.logIn)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    setSnippet(getRandomSnippet())
  }, [])


  const checkCreds = () => {
    const emailSchema = z.string().email()
    const passwordSchema = z.string().min(6)
    try {
      const emailCheck = emailSchema.safeParse(email)
      const passwordCheck = passwordSchema.safeParse(password)

      if (!emailCheck.success) {
        throw new Error()
      }

      if (!passwordCheck.success) {
        throw new Error()
      }

    } catch (error) {
      throw new Error('Invalid credentials, please check your email and password.')
    }
  }



const signInUserPass = async () => {
    try {
    setLoading(true)
    checkCreds()
    const user = await signInWithEmailAndPassword(auth, email, password)
    login(user as unknown as User)
    setLoading(false)
    router.push('/admin/challenges')
    setError('')
    } catch (error) {
      setLoading(false)
      setError('There was an error signing in, try again later.')
    }
}

const signInGoogle = async () => {
  try {
    setLoading(true)
    const provider = new GoogleAuthProvider();
    const signIn = await signInWithPopup(auth, provider)
    login(signIn.user as unknown as User)
    setLoading(false)
    router.push('/admin/challenges')
    setError('')
  } catch (error) {
    setLoading(false)
    setError('There was an error signing in, try again later.')
  }
}



  return (
<div className="dark min-h-screen text-text flex justify-center">
    <div className="max-w-screen-xl m-0 sm:m-10 bg-base shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className='w-auto relative mt-16 lg:mt-0'>
            <div className="logo-blur rounded-full w-36 h-6 absolute bg-teal-500 blur-xl right-32 top-6 opacity-40" />
                <img src="/assets/img/logo.svg" alt="logo"
                    className="w-6/12 mx-auto" />
            </div>
            <div className="mt-12 flex flex-col items-center">
                <p className="">
                    Welcome interviewer
                </p>
                <h1 className="text-2xl xl:text-3xl font-extrabold">
                    Sign-in
                </h1>
                <div className="w-full flex-1 mt-8">
                    <div className="flex flex-col items-center gap-y-2">
                    <Button disabled={loading} onClick={() => signInGoogle()} color="primary" className="w-full max-w-xs h-fit p-2 scale-100 hover:scale-[102%]" variant="bordered">
                        <div className="bg-white p-2 rounded-full">
                            <svg className="w-4" viewBox="0 0 533.5 544.3">
                                <path
                                    d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                    fill="#4285f4" />
                                <path
                                    d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                    fill="#34a853" />
                                <path
                                    d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                    fill="#fbbc04" />
                                <path
                                    d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                    fill="#ea4335" />
                            </svg>
                        </div>
                        <span className="ml-4">
                            Sign In with Google
                        </span>
                    </Button>
                    </div>

                    <div className="my-12 border-t border-primary text-center">
                        <div
                            className="leading-none px-2 inline-block text-sm text-text transform translate-y-1/2">
                            Or sign In with e-mail
                        </div>
                    </div>
                    <div className="mx-auto max-w-xs flex flex-col gap-y-2">
                    <Input type="email" isRequired label="Email" placeholder="Enter your email" color="primary" variant="bordered" isInvalid={error ? true : false} value={email || ''} onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setEmail(e.target.value)} />
                    <PasswordInput type="password" isRequired label="Password" placeholder="Enter your password" color="primary" variant="bordered" isInvalid={error ? true : false} value={password || ''} onChange={(e:React.ChangeEvent<HTMLInputElement> )=> setPassword(e.target.value)} />
                    <Button disabled={loading} color='primary' variant='shadow' className="scale-100 hover:scale-[102%] h-14" onClick={() => signInUserPass()}>
                        <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                            <circle cx="8.5" cy="7" r="4" />
                            <path d="M20 8v6M23 11h-6" />
                        </svg>
                        {
                          loading
                          ? <span className="ml-2"><Spinner color='white' /></span>
                          :  <span className="ml-3">Sign In</span>
                        }
                    </Button>
                        {
                        error && 
                          <div className="alert border border-[#F31260] p-4 rounded-md mt-2">
                            <p className="text-[#F31260] text-xs">{error}</p>
                          </div>
                        }
                    <p className="mt-6 text-xs text-gray-600 text-center">
                    Not a user yet? <Link className='underline' href="mailto:gustavogomez092@gmail.com">contact the admin</Link>
                    </p>
                    <p className="text-xs text-gray-600 text-center">
                    Are you a candidate? <Link className='underline' href="/auth/invite">Login here</Link>
                    </p>
                    <p className="text-xs text-gray-600 text-center">
                    ⓒ Dexter. All Rights Reserved
                    </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex-1 bg-neutral text-center hidden lg:flex relative overflow-hidden items-center justify-center">
        <div className="absolute left-0 w-full h-full bg-gradient-radial from-gray-900/0 to-gray-900/100 z-20" />
        <div className="square absolute bottom-32 right-32 w-[101px] h-[101px] flex items-center justify-center">
          <div className="absolute w-[145%] h-[145%] bg-gradient-conic from-transparent from-10% via-red-400 via-50% to-transparent to-50%  delayed-counter-rotation-animation rounded-full" />
          <div className='absolute bg-gray-900 w-full h-full mx-auto my-auto' />
          <div className='absolute bg-transparent w-full h-full mx-auto my-auto outline outline-gray-900 outline-offset-1 outline-[90px]' />
        </div>
        <div className="square absolute top-60 left-60 w-[301px] h-[301px] flex items-center justify-center">
          <div className="absolute w-[150%] h-[150%] bg-gradient-conic from-transparent from-80% via-green-400 via-80% to-transparent rotation-animation rounded-full" />
          <div className='absolute bg-gray-900 w-full h-full mx-auto my-auto' />
          <div className='absolute bg-transparent w-full h-full mx-auto my-auto outline outline-gray-900 outline-offset-1 outline-[100px]' />
        </div>
        <div className="square absolute top-[120px] left-[120px] w-[101px] h-[101px] flex items-center justify-center">
          <div className="absolute w-[145%] h-[145%] bg-gradient-conic from-transparent from-10% via-blue-400 via-50% to-transparent to-50% counter-rotation-animation rounded-full" />
          <div className='absolute bg-gray-900 w-full h-full mx-auto my-auto' />
          <div className='absolute bg-transparent w-full h-full mx-auto my-auto outline outline-gray-900 outline-offset-1 outline-[90px]' />
        </div>
        <div className="square absolute bottom-[10px] left-0 w-[201px] h-[201px] flex items-center justify-center">
          <div className="absolute w-[145%] h-[145%] bg-gradient-conic from-transparent from-10% via-yellow-400 via-50% to-transparent to-50% counter-rotation-animation rounded-full" />
          <div className='absolute bg-gray-900 w-full h-full mx-auto my-auto' />
          <div className='absolute bg-transparent w-full h-full mx-auto my-auto outline outline-gray-900 outline-offset-1 outline-[90px]' />
        </div>
        <div className="square absolute -top-[70px] right-10 w-[151px] h-[151px] flex items-center justify-center">
          <div className="absolute w-[145%] h-[145%] bg-gradient-conic from-transparent from-10% via-purple-400 via-50% to-transparent to-50% counter-rotation-animation rounded-full" />
          <div className='absolute bg-gray-900 w-full h-full mx-auto my-auto' />
          <div className='absolute bg-transparent w-full h-full mx-auto my-auto outline outline-gray-900 outline-offset-1 outline-[90px]' />
        </div>
        <div className="absolute m-0 w-full h-full bg-cover header z-10" />
        <div className="relative z-20 text-left code-section select-none">
        {
          snippet && 
          <Code className='whitespace-break-spaces' color="primary">
          { snippet }
          </Code>
        }
        </div>
        </div>
    </div>
</div>
)
}
