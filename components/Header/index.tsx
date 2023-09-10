import CountDown from '@/components/CountDown'
import './style.css'
export default function Header() {
  return (
    <div className='h-24 container mx-auto relative flex justify-between items-center'>
      <div className="absolute left-0 w-full h-full" />
      <div className="logo-area h-full z-20 relative w-fit">
        <img src="/assets/img/logo.svg" className="h-full py-6" alt="logo" />
      </div>
    </div>
  )
}
