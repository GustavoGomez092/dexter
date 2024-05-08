'use client';

import {
  SandpackConsole,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
  SandpackTests,
} from '@codesandbox/sandpack-react';
import { SandpackFileExplorer } from './FileEditor';
import CodeEditor from '.';
import { DocumentData, doc, setDoc } from 'firebase/firestore';
import db from '@/providers/firebase';
import { TestType, challengeStore } from '@/store/challengeStore';
import { codeEditorStore } from '@/store/codeEditorStore';
import { Button } from '@nextui-org/react';
import { useEffect, useLayoutEffect, useState } from 'react';

export type TestResultsType = {
  code: string;
  tests: TestType[];
};

const SandPackEditor = ({
  question,
  testId,
  invitationId,
}: {
  question: DocumentData;
  testId: string | null;
  invitationId: string | null;
}) => {
  const findByKey = (
    object: any,
    originalKey: string,
    matches: any[] = []
  ): any[] => {
    if (object != null) {
      if (Array.isArray(object)) {
        for (let arrayItem of object) {
          findByKey(arrayItem, originalKey, matches);
        }
      } else if (typeof object == 'object') {
        for (let key of Object.keys(object)) {
          if (key == originalKey) {
            matches.push(object);
          } else {
            findByKey(object[key], originalKey, matches);
          }
        }
      }
    }

    return matches;
  };

  const setAllowNext = challengeStore((state) => state.setAllowNext);
  const setTestSuite = challengeStore((state) => state.setTests);
  const testSuite = challengeStore((state) => state.tests);

  const code = codeEditorStore((state) => state.code);

  const checkTests = (tests: { [key: string]: any }): void => {
    const result = findByKey(tests, 'status');

    const veredict = result.map((r, i) => {
      return {
        status: r.status,
        description: r.name,
        message: r.errors[0]?.message || 'Test passed',
      };
    });

    setTestSuite(veredict);
  };

  const setAnswer = async (answer: TestResultsType) => {
    // save the answer to the database
    if (!testId || !invitationId) return;

    const passedAll =
      answer.tests.filter((a) => a.status === 'fail').length === 0;

    await setDoc(doc(db, 'Challenge', invitationId, 'Answers', question.id), {
      answer: answer,
      question: question?.data?.question?.text,
      correct: question?.data?.question?.runTests
        ? passedAll
          ? 'yes'
          : 'no'
        : 'check',
    });

    setAllowNext(true);
  };

  const submitCode = () => {
    const data = {
      code: code,
      tests: testSuite,
    };
    setAnswer(data);
  };

  return (
    <SandpackProvider
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      template={question.data.question.sandpackType}
      files={question.data.question.code}
      theme='dark'
    >
      <div className='flex w-full px-2 pt-2'>
        <Button
          color='primary'
          onPress={() => submitCode()}
          className='mb-4 w-full'
        >
          <span className='text-text'>Submit code</span>
        </Button>
      </div>
      <SandpackLayout
        className='flex h-full flex-row gap-y-2'
        style={{ rowGap: '6px' }}
      >
        <div className='flex h-[70%] w-full flex-row'>
          <SandpackFileExplorer />
          <CodeEditor
            question={question}
            testId={testId}
            invitationId={invitationId}
          />
        </div>
        <div className='flex h-[30%] w-full gap-2'>
          <SandpackPreview
            style={{ width: '50%' }}
            showOpenInCodeSandbox={false}
            showRefreshButton={false}
            showOpenNewtab={true}
            showSandpackErrorOverlay={false}
          />
          <SandpackConsole
            style={{ width: '50%', maxHeight: '190px' }}
            className='text-[18px]'
            resetOnPreviewRestart={true}
          />
          <SandpackTests
            onComplete={(results) => checkTests(results)}
            hideTestsAndSupressLogs={true}
            style={{ width: '0', opacity: 0, pointerEvents: 'none' }}
          />
        </div>
      </SandpackLayout>
    </SandpackProvider>
  );
};

export default SandPackEditor;
