'use client';

import 'github-markdown-css';
import './style.css';
import { codeToHtml } from 'shiki';
import { useEffect, useState } from 'react';

export default function ChallengePrompter({
  title,
  prompt,
  code,
}: {
  title: string;
  prompt: string;
  code: string;
}) {
  const [fialCode, setFinalCode] = useState<any>('');

  useEffect(() => {
    const highlightedCode = async (code: string) => {
      const shiki = await codeToHtml(`${code}`, {
        lang: 'javascript',
        theme: 'github-dark-default',
      });
      return shiki;
    };

    highlightedCode(code).then((res) => {
      setFinalCode(res);
    });
  });

  return (
    <div className='markdown-body h-full p-6'>
      {title && <h1>{title}</h1>}
      <div
        data-track-load='description_content'
        className='relative flex h-[calc(100%-80px)] w-full flex-col justify-center'
      >
        {prompt && <p className=' text-[22px]'>{prompt}</p>}
        {code && fialCode && (
          <pre>
            <code
              className='highlight highlight-source-js'
              dangerouslySetInnerHTML={{ __html: fialCode }}
            ></code>
          </pre>
        )}
      </div>
    </div>
  );
}
