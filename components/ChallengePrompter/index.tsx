"use client"

import "github-markdown-css"
import "./style.css"
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/hybrid.min.css';



export default function ChallengePrompter({ title, prompt, code}: { title: string, prompt: string, code: string }) {
  // Then register the languages you need
  hljs.registerLanguage('javascript', javascript);

  const highlightedCode = hljs.highlight(
    `${code}`,
    { language: 'javascript' }
  ).value

  return (
    <div className="markdown-body p-6 h-full">
      {
        title &&
        <h1>
          {title}
        </h1>
      }
      <div data-track-load="description_content" className="xFUwe w-full h-full flex flex-col content-center justify-center relative -top-0 lg:-top-20">
        {
          prompt &&
          <p className=" text-[22px]">
            {prompt}
          </p>
        }
        {
          code &&
          <pre>
            <code className="highlight highlight-source-js" dangerouslySetInnerHTML={{__html: highlightedCode}}>
            </code>
          </pre>
        }
      </div>
    </div>
  )
}
