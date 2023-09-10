import CountDown from '@/components/CountDown'
import './style.css'
export default function ChallengeHeader() {
  return (
    <div className='header h-24 container mx-auto relative flex justify-between items-center'>
      <div className="absolute left-0 w-full h-full bg-gradient-to-b from-gray-900/0 to-gray-900/100" />
      <div className="logo-area h-full z-20 relative w-fit">
        <div className="logo-blur rounded-full w-36 h-6 absolute bg-teal-500 blur-xl left-12 top-10 opacity-40" />
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
