import { codeEditorStore } from '@/store/codeEditorStore';
import './style.css';
import { useState } from 'react';
import { Victor_Mono } from 'next/font/google';
import { Chip } from '@nextui-org/react';
const font = Victor_Mono({ weight: '400', subsets: ['latin'] });

export default function index() {
  const [result, setResult] = useState('');
  const consoleOutput = codeEditorStore((state) => state.consoleOutput);
  const clearConsoleOutput = codeEditorStore(
    (state) => state.clearConsoleOutput
  );

  return (
    <div className='flex h-full gap-4'>
      <div className='h-full w-1/2 overflow-auto rounded-sm bg-[#161b22] p-6 dark'>
        <div className='flex'>
          <p
            className={`${font.className} mb-4 text-[12px] text-text opacity-40`}
          >
            Output:
          </p>
        </div>
        <div className={`${font.className} text-[16px] text-text`}>
          {result}
        </div>
      </div>
      <div className='h-full w-1/2 overflow-auto rounded-sm bg-[#161b22] p-6 dark'>
        <div className='flex justify-between'>
          <p
            className={`${font.className} mb-4 text-[12px] text-text opacity-40`}
          >
            Console:
          </p>
          <Chip
            color='danger'
            onClick={() => clearConsoleOutput()}
            className='cursor-pointer hover:scale-105'
          >
            clear
          </Chip>
        </div>
        <div
          className={`${font.className} text-[16px] text-text`}
          dangerouslySetInnerHTML={{ __html: consoleOutput }}
        ></div>
      </div>
    </div>
  );
}
