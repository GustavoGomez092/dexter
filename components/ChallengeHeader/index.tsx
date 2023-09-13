import CountDown from '@/components/CountDown'
import './style.css'
export default function ChallengeHeader() {
  return (
    <div className='h-[250px] lg:h-[96px] container mx-auto relative flex flex-col lg:flex-row justify-between items-center overflow-hidden !px-6'>
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
      <div className="logo-area h-full z-20 relative w-fit">
        <div className="logo-blur rounded-full w-36 h-6 absolute bg-teal-500 blur-xl left-12 top-7 opacity-40" />
        <img src="/assets/img/logo.svg" className="h-full py-6" alt="logo" />
      </div>
      <div className="header-center text-center">
        <h1 className=" z-20 relative text-2xl font-bold text-gray-400">Participant: Gustavo Gomez</h1>
        <p className="z-20 relative text-gray-400">Challenge: <span className="font-bold">01 / 03</span></p>
      </div>
      <div className="timer h-full flex items-center justify-between z-20 relative">
        <div className="header-left flex items-center">
          <CountDown />
          </div>
      </div>
      
    </div>
  )
}
