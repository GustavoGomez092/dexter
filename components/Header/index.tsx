import { Button } from '@nextui-org/react';
import './style.css';
import { authStore } from '@/store/authStore';
import { applicantStore } from '@/store/applicantStore';
import Image from 'next/image';
export default function Header() {
  const user = authStore((state) => state.user);
  const applicantName = applicantStore((state) => state.name);
  const applicantLogout = applicantStore((state) => state.logOut);
  const logout = authStore((state) => state.logOut);

  return (
    <div className='container relative mx-auto flex h-24 items-center justify-between dark'>
      <div className='absolute left-0 h-full w-full' />
      <div className='logo-area relative z-20 h-full w-fit'>
        <Image
          src='/assets/img/logo.svg'
          width='190'
          height='46'
          className='h-full py-6'
          alt='logo'
        />
      </div>
      {user.email && (
        <div className='user-area flex flex-col-reverse items-center gap-x-6 lg:flex-row'>
          <div className='user-info'>
            <div className='user-name hidden text-text lg:flex'>
              {user.displayName || user.email}
            </div>
          </div>
          <div className='actions'>
            <Button color='danger' onClick={() => logout()}>
              Logout
            </Button>
          </div>
        </div>
      )}
      {applicantName && (
        <div className='user-area flex flex-col-reverse items-center gap-x-6 lg:flex-row'>
          <div className='user-info'>
            <div className='user-name hidden text-text lg:flex'>
              Hello, {applicantName}
            </div>
          </div>
          <div className='actions'>
            <Button color='danger' onClick={() => applicantLogout()}>
              Logout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
