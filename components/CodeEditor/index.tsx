"use client"

import Editor from "@monaco-editor/react"
import { Button, code } from "@nextui-org/react"
import { DocumentData } from "firebase/firestore"
import { getHighlighter } from "shiki"
import { shikiToMonaco } from "@shikijs/monaco"
import { ReactElement, useRef } from "react"
import { codeEditorStore } from "@/store/codeEditorStore"
import { set } from "firebase/database"

const CodeEditor = ({
  question,
  testId,
  invitationId,
}: {
  question: DocumentData
  testId: string | null
  invitationId: string | null
}) => {

  // console.log(question)
  // console.log(testId)
  // console.log(invitationId)

  const editorRef = useRef<any>(null);
  const setCode = codeEditorStore((state) => state.setCode)
  const setLanguage = codeEditorStore((state) => state.setLanguage)

  function handleEditorDidMount(editor:any, monaco:any) {
    editorRef.current = editor;
  }

  const handleEditorWillMount = async (monaco: any) => {
    // Create the highlighter, it can be reused
    const highlighter = await getHighlighter({
      themes: ["github-dark-default"],
      langs: [question.data.question.language],
    })
    monaco.languages.register({ id: question.data.question.language })

    const newTheme = highlighter.getTheme('github-dark-default')
    if (newTheme.colors) {
      newTheme.colors['symbolIcon.constantForeground'] = '#1fb2a6'
    }

    // Register the themes from Shiki, and provide syntax highlighting for Monaco.
    shikiToMonaco(highlighter, monaco)
  }

  function showValue() {
    setLanguage(question.data.question.language)
    setCode(editorRef?.current?.getValue())
  }

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <p className="text-gray-500 capitalize">{question.data.question.language}</p>
        <div className="flex dark">
          <Button onClick={()=> showValue()} color="primary" variant="bordered" className="mr-4 font-bold">
            Test code
          </Button>
          <Button color="primary" className="text-text font-bold">
            Submit
          </Button>
        </div>
      </div>
      <Editor
        height="100%"
        defaultLanguage={question.data.question.language}
        options={{
          fontSize: 16,
          minimap: {
            enabled: false,
          },
          wordWrap: "on",
        }}
        defaultValue={`${question.data.question.code}`}
        beforeMount={(monaco) => handleEditorWillMount(monaco)}
        onMount={handleEditorDidMount}
        theme="github-dark-default"
      />
    </>
  )
}

export default CodeEditor
