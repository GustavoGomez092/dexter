
import { applicantStore } from '@/store/applicantStore'
import './style.css'
import { challengeStore } from '@/store/challengeStore'
import { Button, Link } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

export default function ChallengeHeader() {

  const name = applicantStore((state: any) => state.name)
  const currentQuestion = challengeStore((state: any) => state.currentQuestion)
  const totalQuestions = challengeStore((state: any) => state.totalQuestions)
  const allowNext = challengeStore((state: any) => state.allowNext)
  const setAlowNext = challengeStore((state: any) => state.setAllowNext)
  const setCurrentQuestion = challengeStore((state: any) => state.setCurrentQuestion)
  const challengeId = challengeStore((state: any) => state)
  const router = useRouter()
  const setChallengeComplete = challengeStore((state: any) => state.setComplete)
  const challengeComplete = challengeStore((state: any) => state.complete)


  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1)
    setAlowNext(false)
  }

  const finish = () => {
    setChallengeComplete(true)
    router.push(`/candidate/challenge/${challengeId.challengeInviteId}/challenge-completed`)
  }

  return (
    <div className='min-h-[250px] lg:min-h-[96px] container mx-auto relative flex flex-col lg:flex-row justify-between items-center overflow-hidden !px-6 dark'>
      <div className="header-bg absolute w-full h-full">
      <div className="absolute left-0 w-full h-full bg-gradient-to-b from-gray-900/0 to-gray-900/100" />
      <div className="absolute overflow-hidden h-full w-full top-0 left-0 z-0">
        <div className="absolute left-0 w-full h-full bg-gradient-radial from-gray-900/0 to-gray-900/100 z-20" />
        <div className="square absolute top-10 left-[16%] w-[301px] h-[301px] flex items-center justify-center">
          <div className="absolute w-[150%] h-[150%] bg-gradient-conic from-transparent from-80% via-green-400 via-80% to-transparent rotation-animation rounded-full" />
          <div className='absolute bg-gray-900 w-full h-full mx-auto my-auto' />
          <div className='absolute bg-transparent w-full h-full mx-auto my-auto outline outline-gray-900 outline-offset-1 outline-[100px]' />
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
        </div>
      </div>
      <div className="logo-area h-full z-20 relative  w-full lg:w-3/12">
        <div className="logo-blur rounded-full w-36 h-6 absolute bg-teal-500 blur-xl left-12 top-7 opacity-40" />
        <img src="/assets/img/logo.svg" className="h-full py-6 max-w-[200px]" alt="logo" />
      </div>
      <div className="header-center text-center h-full lg:w-6/12">
        <h1 className=" z-20 relative text-2xl font-bold text-gray-400">Participant: {name}</h1>
        { 
          (currentQuestion !== 0 && totalQuestions !== 0) && !challengeComplete ? (
            <h2 className="z-20 relative text-lg text-gray-400">Question {currentQuestion} of {totalQuestions}</h2>
          )
          : !challengeComplete ?
          (
            <h2 className="z-20 relative text-lg text-gray-400">Waiting for challenge to start...</h2>
          )
          : <h2 className="z-20 relative text-lg text-gray-400">Challenge complete.</h2>
        }
      </div>
      <div className="logo-area h-full z-20 relative min-w-[250px] w-full lg:w-3/12 flex justify-center">
        {
          currentQuestion !== totalQuestions ?
          <Button onClick={() => nextQuestion()} disabled={!allowNext} className={`p-4 ${!allowNext ? 'cursor-not-allowed pointer-events-none opacity-50' : 'cursor-pointer pointer-events-auto opacity-100'}`} color={ !allowNext ? 'default' : 'primary'}>
            <span className={`font-bold ${!allowNext ? 'text-black' : 'text-text'}`}>Next Question</span>
          </Button>
          : totalQuestions !== 0 && !challengeComplete  ?
            <Button onClick={()=> finish()} disabled={!allowNext} className={`p-4 ${!allowNext ? 'cursor-not-allowed pointer-events-none opacity-50' : 'cursor-pointer pointer-events-auto opacity-100'}`} color={ !allowNext ? 'default' : 'success'}>
              <span className={`font-bold ${!allowNext ? 'text-black' : 'text-text'}`}>Finish Test</span>
            </Button>
          : null
        }
      </div>
    </div>
  )
}
