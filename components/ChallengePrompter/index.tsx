'use client';

import 'github-markdown-css';
import './style.css';
import { codeToHtml } from 'shiki';
import { useEffect, useState } from 'react';
import { Code } from '@/tests/test.type';

export default function ChallengePrompter({
  title,
  prompt,
  code,
}: {
  title: string;
  prompt: string;
  code: Code;
}) {
  const [finalCode, setFinalCode] = useState<any>('');
  const mainFile = 'index.js';

  useEffect(() => {
    if (code) {
      const highlightedCode = async (code: string) => {
        const shiki = await codeToHtml(code, {
          lang: 'javascript',
          theme: 'github-dark-default',
        });
        return shiki;
      };

      highlightedCode(code[mainFile].code).then((res) => {
        setFinalCode(res);
      });
    }
  }, [code]);

  return (
    <div className='markdown-body h-full p-6'>
      {title && <h1>{title}</h1>}
      <div
        data-track-load='description_content'
        className='relative flex h-[calc(100%-80px)] w-full flex-col justify-center'
      >
        {prompt && <p className=' text-[22px]'>{prompt}</p>}
        {code && finalCode && (
          <pre>
            <code
              className='highlight highlight-source-js'
              dangerouslySetInnerHTML={{ __html: finalCode }}
            ></code>
          </pre>
        )}
      </div>
    </div>
  );
}
