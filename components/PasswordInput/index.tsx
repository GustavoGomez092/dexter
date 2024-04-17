import React from 'react';
import { Input } from '@nextui-org/react';
import { EyeFilledIcon } from './EyeFilledIcon';
import { EyeSlashFilledIcon } from './EyeSlashFilledIcon';

export default function PasswordInput(props: any) {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <Input
      {...props}
      endContent={
        <button
          className='focus:outline-none'
          type='button'
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <EyeSlashFilledIcon className='pointer-events-none text-2xl text-default-400' />
          ) : (
            <EyeFilledIcon className='pointer-events-none text-2xl text-default-400' />
          )}
        </button>
      }
      type={isVisible ? 'text' : 'password'}
    />
  );
}
