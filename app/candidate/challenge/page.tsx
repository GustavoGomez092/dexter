'use client'

import CodeEditor from '@/components/CodeEditor'
import ChallengePrompter from '@/components/ChallengePrompter'
import PerfectScrollbar from 'react-perfect-scrollbar'
import Console from '@/components/Console'

export default function Page() {
  return (
    <main className="flex h-auto lg:h-[80vh] flex-col items-center justify-between py-6">
    <div className="container flex-row lg:flex h-full gap-2">
      <div className="left-area w-full lg:w-6/12 card-border">
      <PerfectScrollbar>
        <div className="question-area h-full">
          <ChallengePrompter />
        </div>
      </PerfectScrollbar>
      </div>
      <div className="right-area w-full h-auto lg:h-full lg:w-6/12 card-border">
        <div className="editor-area h-96 lg:h-4/6 px-6 pt-2 overflow-hidden">
        <CodeEditor />
        </div>
        <div className="console-area h-96 lg:h-2/6 px-6 py-2">
        <Console />
        </div>
        <div className="output-area"></div>
      </div>    
    </div>
  </main>
  )
}