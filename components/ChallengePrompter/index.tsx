"use client"

import "github-markdown-css"
import "./style.css"
export default function ChallengePrompter({ title, prompt, code}: { title: string, prompt: string, code: string }) {
  return (
    <div className="markdown-body p-6 h-full">
      {
        title &&
        <h1>
          {title}
        </h1>
      }
      <div data-track-load="description_content" className="xFUwe w-full h-full flex items-center relative -top-20">
        {
          prompt &&
          <p className=" text-[22px]">
            {prompt}
          </p>
        }
        {
          code &&
          <code>
            {code}
          </code>
        }
      </div>
    </div>
  )
}
