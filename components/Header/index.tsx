
import { Button } from '@nextui-org/react'
import './style.css'
import { authStore } from '@/store/authStore'
export default function Header() {

  const user = authStore((state) => state.user)
  const logout = authStore((state) => state.logOut)


  return (
    <div className='h-24 container mx-auto relative flex justify-between items-center dark'>
      <div className="absolute left-0 w-full h-full" />
      <div className="logo-area h-full z-20 relative w-fit">
        <img src="/assets/img/logo.svg" className="h-full py-6" alt="logo" />
      </div>
      {
        user.email &&
        <div className="user-area flex flex-col-reverse lg:flex-row items-center gap-x-6">
          <div className="user-info">
            <div className="hidden lg:flex text-text user-name">{user.displayName || user.email }</div>
          </div>
          <div className="actions">
            <Button color='danger' onClick={()=>logout()}>Logout</Button>
          </div>
        </div>
      }
    </div>
  )
}
