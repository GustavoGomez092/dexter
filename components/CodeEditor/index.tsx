'use client';

import Editor from '@monaco-editor/react';
import { Button } from '@nextui-org/react';
import { DocumentData, doc, setDoc } from 'firebase/firestore';
import { getHighlighter } from 'shiki';
import { shikiToMonaco } from '@shikijs/monaco';
import { useRef, useState } from 'react';
import { codeEditorStore } from '@/store/codeEditorStore';
import { challengeStore } from '@/store/challengeStore';
import db from '@/providers/firebase';
import { useJS } from '@/hooks/useJS';

export type TestResultsType = {
  code: string;
  input: any;
  expectedOutput: any;
  output: any;
  passed: string;
};

const CodeEditor = ({
  question,
  testId,
  invitationId,
}: {
  question: DocumentData;
  testId: string | null;
  invitationId: string | null;
}) => {
  console.log(question);
  // console.log(testId)
  // console.log(invitationId)

  const editorRef = useRef<any>(null);
  const setCode = codeEditorStore((state) => state.setCode);
  const setLanguage = codeEditorStore((state) => state.setLanguage);
  const { runTest } = useJS();
  const [disable, setDisable] = useState(false);

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

  const handleEditorWillMount = async (monaco: any) => {
    // Create the highlighter, it can be reused
    const highlighter = await getHighlighter({
      themes: ['github-dark-default'],
      langs: [question.data.question.language],
    });
    monaco.languages.register({ id: question.data.question.language });

    const newTheme = highlighter.getTheme('github-dark-default');
    if (newTheme.colors) {
      newTheme.colors['symbolIcon.constantForeground'] = '#1fb2a6';
    }

    // Register the themes from Shiki, and provide syntax highlighting for Monaco.
    shikiToMonaco(highlighter, monaco);
  };

  function showValue() {
    setLanguage(question.data.question.language);
    setCode(editorRef?.current?.getValue());
  }

  const setAllowNext = challengeStore((state) => state.setAllowNext);

  const runTests = async () => {
    setDisable(true);
    const testResults: TestResultsType[] = [];
    for (const test of question.data.question.testCases) {
      const result = await runTest(
        editorRef?.current?.getValue(),
        test.function,
        test.input,
        test.output
      );
      testResults.push({
        code: editorRef?.current?.getValue(),
        input: test.input,
        expectedOutput: test.output,
        output: result.output,
        passed: result.status,
      });
    }
    await setAnswer(testResults);
    return testResults;
  };

  const setAnswer = async (answer: TestResultsType[]) => {
    // save the answer to the database
    if (!testId || !invitationId) return;

    const passedAll = answer.filter((a) => a.passed === 'fail').length === 0;

    await setDoc(doc(db, 'Challenge', invitationId, 'Answers', question.id), {
      answer: answer,
      question: question?.data?.question?.text,
      correct: passedAll ? 'yes' : 'no',
    });

    setAllowNext(true);
  };

  return (
    <>
      <div className='mb-2 flex items-center justify-between'>
        <p className='capitalize text-gray-500'>
          {question.data.question.language}
        </p>
        <div className='flex dark'>
          <Button
            onClick={() => showValue()}
            disabled={disable}
            color='primary'
            variant='bordered'
            className={`mr-4 font-bold ${disable ? 'pointer-events-none opacity-40' : ''}`}
          >
            Test code
          </Button>
          <Button
            onClick={() => runTests()}
            disabled={disable}
            color='primary'
            className={`font-bold text-text ${disable ? 'pointer-events-none opacity-40' : ''}`}
          >
            {disable ? 'Submitted' : 'Submit'}
          </Button>
        </div>
      </div>
      <Editor
        height='100%'
        defaultLanguage={question.data.question.language}
        options={{
          fontSize: 16,
          minimap: {
            enabled: false,
          },
          wordWrap: 'on',
        }}
        defaultValue={`${question.data.question.code}`}
        beforeMount={(monaco) => handleEditorWillMount(monaco)}
        onMount={handleEditorDidMount}
        theme='github-dark-default'
      />
    </>
  );
};

export default CodeEditor;
