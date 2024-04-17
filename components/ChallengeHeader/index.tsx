import { applicantStore } from '@/store/applicantStore';
import './style.css';
import { challengeStore } from '@/store/challengeStore';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ChallengeHeader() {
  const name = applicantStore((state: any) => state.name);
  const currentQuestion = challengeStore((state: any) => state.currentQuestion);
  const totalQuestions = challengeStore((state: any) => state.totalQuestions);
  const allowNext = challengeStore((state: any) => state.allowNext);
  const setAlowNext = challengeStore((state: any) => state.setAllowNext);
  const setCurrentQuestion = challengeStore(
    (state: any) => state.setCurrentQuestion
  );
  const challengeId = challengeStore((state: any) => state);
  const router = useRouter();
  const setChallengeComplete = challengeStore(
    (state: any) => state.setComplete
  );
  const challengeComplete = challengeStore((state: any) => state.complete);

  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setAlowNext(false);
  };

  const finish = () => {
    setChallengeComplete(true);
    router.push(
      `/candidate/challenge/${challengeId.challengeInviteId}/challenge-completed`
    );
  };

  return (
    <div className='container relative mx-auto flex min-h-[250px] flex-col items-center justify-between overflow-hidden !px-6 dark lg:min-h-[96px] lg:flex-row'>
      <div className='header-bg absolute h-full w-full'>
        <div className='absolute left-0 h-full w-full bg-gradient-to-b from-gray-900/0 to-gray-900/100' />
        <div className='absolute left-0 top-0 z-0 h-full w-full overflow-hidden'>
          <div className='absolute left-0 z-20 h-full w-full bg-gradient-radial from-gray-900/0 to-gray-900/100' />
          <div className='square absolute left-[16%] top-10 flex h-[301px] w-[301px] items-center justify-center'>
            <div className='rotation-animation absolute h-[150%] w-[150%] rounded-full bg-gradient-conic from-transparent from-80% via-green-400 via-80% to-transparent' />
            <div className='absolute mx-auto my-auto h-full w-full bg-gray-900' />
            <div className='absolute mx-auto my-auto h-full w-full bg-transparent outline outline-[100px] outline-offset-1 outline-gray-900' />
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
      <div className='logo-area relative z-20 h-full  w-full lg:w-3/12'>
        <div className='logo-blur absolute left-12 top-7 h-6 w-36 rounded-full bg-teal-500 opacity-40 blur-xl' />
        <Image
          src='/assets/img/logo.svg'
          width='190'
          height='46'
          className='h-full max-w-[200px] py-6'
          alt='logo'
        />
      </div>
      <div className='header-center h-full text-center lg:w-6/12'>
        <h1 className=' relative z-20 text-2xl font-bold text-gray-400'>
          Participant: {name}
        </h1>
        {currentQuestion !== 0 && totalQuestions !== 0 && !challengeComplete ? (
          <h2 className='relative z-20 text-lg text-gray-400'>
            Question {currentQuestion} of {totalQuestions}
          </h2>
        ) : !challengeComplete ? (
          <h2 className='relative z-20 text-lg text-gray-400'>
            Waiting for challenge to start...
          </h2>
        ) : (
          <h2 className='relative z-20 text-lg text-gray-400'>
            Challenge complete.
          </h2>
        )}
      </div>
      <div className='logo-area relative z-20 flex h-full w-full min-w-[250px] justify-center lg:w-3/12'>
        {currentQuestion !== totalQuestions ? (
          <Button
            onClick={() => nextQuestion()}
            disabled={!allowNext}
            className={`p-4 ${!allowNext ? 'pointer-events-none cursor-not-allowed opacity-50' : 'pointer-events-auto cursor-pointer opacity-100'}`}
            color={!allowNext ? 'default' : 'primary'}
          >
            <span
              className={`font-bold ${!allowNext ? 'text-black' : 'text-text'}`}
            >
              Next Question
            </span>
          </Button>
        ) : totalQuestions !== 0 && !challengeComplete ? (
          <Button
            onClick={() => finish()}
            disabled={!allowNext}
            className={`p-4 ${!allowNext ? 'pointer-events-none cursor-not-allowed opacity-50' : 'pointer-events-auto cursor-pointer opacity-100'}`}
            color={!allowNext ? 'default' : 'success'}
          >
            <span
              className={`font-bold ${!allowNext ? 'text-black' : 'text-text'}`}
            >
              Finish Test
            </span>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
