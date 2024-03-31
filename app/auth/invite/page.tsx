"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Button, Code, Input, Spinner } from "@nextui-org/react"
import randomSnippetGenerator from "../../../hooks/userRandomSnippetGenerator"
import { useRouter } from "next/navigation"
import { z } from "zod";
import { applicantStore } from "@/store/applicantStore"
import { auth } from "@/providers/firebase"
import { signInAnonymously } from "firebase/auth"

export default function page() {
 
  const [snippet, setSnippet] = useState("")
  const { getRandomSnippet } = randomSnippetGenerator()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [inviteCode, setInviteCode] = useState("")
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [inviteCodeError, setInviteCodeError] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const applicantLogin = applicantStore((state) => state.logIn)

  useEffect(() => {
    setSnippet(getRandomSnippet())
  }, [])

  const checkCreds = async () => {
    const emailSchema = z.string().email()
    const nameSchema = z.string().min(3)
    const inviteCodeSchema = z.string().min(10).max(10)
    const emailEval = await emailSchema.safeParseAsync(email)
    const nameEval = await nameSchema.safeParseAsync(name)
    const inviteCodeEval = await inviteCodeSchema.safeParseAsync(inviteCode)

    if (!emailEval.success) {
      setEmailError(true)
      throw new Error()
    } else {
      setEmailError(false)
    }

    if (!nameEval.success) {
      setNameError(true)
      throw new Error()
    } else {
      setNameError(false)
    }

    if (!inviteCodeEval.success) {
      setInviteCodeError(true)
      throw new Error()
    } else {
      setInviteCodeError(false)
    }
  }

  const signInCandidate = async () => {
    try {
      setLoading(true)
      await checkCreds()
      applicantLogin({name, email, inviteId: inviteCode, loading: false})
      await anonymusLogin()
      setLoading(false)
      router.push("/candidate/waiting-room")
    } catch (error) {
      setLoading(false)
      setError("Invalid credentials, please check your email, name and invite code.")
      console.log(error)
    }
  }

  const anonymusLogin = async () => {
    try {
      await signInAnonymously(auth)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="dark min-h-screen text-text flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-base shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="w-auto relative mt-16 lg:mt-0">
            <div className="logo-blur rounded-full w-36 h-6 absolute bg-teal-500 blur-xl right-32 top-6 opacity-40" />
            <img
              src="/assets/img/logo.svg"
              alt="logo"
              className="w-6/12 mx-auto"
            />
          </div>
          <div className="mt-12 flex flex-col items-center">
            <p>Welcome Applicant</p>
            <h1 className="text-2xl xl:text-3xl font-extrabold">Start your test here:</h1>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs flex flex-col gap-y-2">
                <Input
                  type="email"
                  isRequired
                  label="Email"
                  placeholder="Enter your email"
                  color="primary"
                  variant="bordered"
                  isInvalid={emailError}
                  value={email|| ""}
                  onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
                <Input
                  type="text"
                  isRequired
                  label="name"
                  placeholder="Enter your name"
                  color="primary"
                  variant="bordered"
                  className="mb-2"
                  isInvalid={nameError}
                  value={name|| ""}
                  onChange={(e:React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                />
                <Input
                  type="text"
                  isRequired
                  label="invite-code"
                  placeholder="Paste your invite code here...."
                  color="primary"
                  variant="bordered"
                  className="mb-2"
                  isInvalid={inviteCodeError}
                  value={inviteCode||""}
                  onChange={(e) => setInviteCode(e.target.value)}
                />
                <Button
                  color="primary"
                  variant="shadow"
                  className="scale-100 hover:scale-[102%] h-14"
                  onClick={() => signInCandidate()}
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path
                      className="stroke-text"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 6h10m-10 6h10m-10 6h10M3 11.945 4.538 13.5 8 10M3 5.944 4.538 7.5 8 4M4.5 18h.01M5 18a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
                    />
                  </svg>
                  {
                    loading
                    ? <span className="ml-2"><Spinner color='white' /></span>
                    :  <span className="ml-3">Start Test</span>
                  }
                </Button>
                {
                  error && 
                    <div className="alert border border-[#F31260] p-4 rounded-md mt-2">
                      <p className="text-[#F31260] text-xs">{error}</p>
                    </div>
                }
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Are you an Interviewer?{" "}
                  <Link className="underline" href="/auth/signin">
                    Sign In
                  </Link>
                </p>
                <p className="text-xs text-gray-600 text-center">
                  By clicking the "Start Test" button you agree to abide by Dexter's{" "}
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Terms of Service
                  </a>{" "}
                  and its{" "}
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-neutral text-center hidden lg:flex relative overflow-hidden items-center justify-center">
          <div className="absolute left-0 w-full h-full bg-gradient-radial from-gray-900/0 to-gray-900/100 z-20" />
          <div className="square absolute bottom-32 right-32 w-[101px] h-[101px] flex items-center justify-center">
            <div className="absolute w-[145%] h-[145%] bg-gradient-conic from-transparent from-10% via-red-400 via-50% to-transparent to-50%  delayed-counter-rotation-animation rounded-full" />
            <div className="absolute bg-gray-900 w-full h-full mx-auto my-auto" />
            <div className="absolute bg-transparent w-full h-full mx-auto my-auto outline outline-gray-900 outline-offset-1 outline-[90px]" />
          </div>
          <div className="square absolute top-60 left-60 w-[301px] h-[301px] flex items-center justify-center">
            <div className="absolute w-[150%] h-[150%] bg-gradient-conic from-transparent from-80% via-green-400 via-80% to-transparent rotation-animation rounded-full" />
            <div className="absolute bg-gray-900 w-full h-full mx-auto my-auto" />
            <div className="absolute bg-transparent w-full h-full mx-auto my-auto outline outline-gray-900 outline-offset-1 outline-[100px]" />
          </div>
          <div className="square absolute top-[120px] left-[120px] w-[101px] h-[101px] flex items-center justify-center">
            <div className="absolute w-[145%] h-[145%] bg-gradient-conic from-transparent from-10% via-blue-400 via-50% to-transparent to-50% counter-rotation-animation rounded-full" />
            <div className="absolute bg-gray-900 w-full h-full mx-auto my-auto" />
            <div className="absolute bg-transparent w-full h-full mx-auto my-auto outline outline-gray-900 outline-offset-1 outline-[90px]" />
          </div>
          <div className="square absolute bottom-[10px] left-0 w-[201px] h-[201px] flex items-center justify-center">
            <div className="absolute w-[145%] h-[145%] bg-gradient-conic from-transparent from-10% via-yellow-400 via-50% to-transparent to-50% counter-rotation-animation rounded-full" />
            <div className="absolute bg-gray-900 w-full h-full mx-auto my-auto" />
            <div className="absolute bg-transparent w-full h-full mx-auto my-auto outline outline-gray-900 outline-offset-1 outline-[90px]" />
          </div>
          <div className="square absolute -top-[70px] right-10 w-[151px] h-[151px] flex items-center justify-center">
            <div className="absolute w-[145%] h-[145%] bg-gradient-conic from-transparent from-10% via-purple-400 via-50% to-transparent to-50% counter-rotation-animation rounded-full" />
            <div className="absolute bg-gray-900 w-full h-full mx-auto my-auto" />
            <div className="absolute bg-transparent w-full h-full mx-auto my-auto outline outline-gray-900 outline-offset-1 outline-[90px]" />
          </div>
          <div className="absolute m-0 w-full h-full bg-cover header z-10" />
          <div className="relative z-20 text-left code-section select-none">
            {snippet && (
              <Code className="whitespace-break-spaces" color="primary">
                {snippet}
              </Code>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
