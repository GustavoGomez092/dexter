import React, { useEffect, useState } from "react";
import {Card, CardBody} from "@nextui-org/react";
import allTests from "@/tests";
import { DocumentData, doc, onSnapshot, setDoc } from "firebase/firestore";
import db from "@/providers/firebase";
import { codeToHtml } from 'shiki'
import "github-markdown-css"
import { TestResultsType } from "../CodeEditor";

export enum Correct {
  YES = 'yes',
  NO = 'no',
  CHECK = 'check',
}

type props = {
  index: number;
  challengeId: string|null;
  questionId: string;
}

const AdminQuestion = ({questionId, index, challengeId}: props) => {
  
  const getQuestionById = (id: string) => {
    return allTests.map(test => test.tests).flat().map(t => t.questions).flat().find(q => q.id === id);
  }

  const question = getQuestionById(questionId);
  const [answer, setAnswer] = useState<DocumentData>({})
  const [code, setCode] = useState<string>('')
  const [testCode, setTestCode] = useState<string>('')

  const isCorrect = () => {
    if (!answer) return '';
    if (!answer?.correct) return '';
    switch (answer?.correct) {
      case Correct.YES:
        return 'bg-green-950';
      case Correct.NO:
        return 'bg-red-950';
      case Correct.CHECK:
        return 'bg-yellow-950';
      default:
        return '';
    }
  }

  const AnwswersChangedListener = (challengeId: string, questionId:string) => {
    onSnapshot(doc(db, "Challenge", challengeId, 'Answers', questionId), (doc: DocumentData) => {
      const collectionData = doc.data()
      setAnswer(collectionData)
    })
  }

  useEffect(() => {
    if (challengeId) AnwswersChangedListener(challengeId, questionId)
  }, [challengeId]);

  const updateQuestion = async (correct: string) => {
    if (!challengeId) return;
      await setDoc(doc(db, "Challenge", challengeId, 'Answers', questionId), {
        correct: correct,
        answer: answer?.answer,
      })
  }

  const generateCodeSnippet = async (code: string) => {
    const highlightedCode = await codeToHtml(`${code}`, {
      lang: 'javascript',
      theme: 'github-dark-default'
    })
    setCode(highlightedCode)
  }

  const generateUserCode = async (code: string) => {
    const highlightedCode = await codeToHtml(`${code}`, {
      lang: 'javascript',
      theme: 'github-dark-default'
    })
    setTestCode(highlightedCode)
  }

  useEffect(() => {
    if(!question) return
    if (question.question.code) generateCodeSnippet(question?.question?.code)
  }, [question])


  useEffect(() => {
    if (!Array.isArray(answer?.answer)) return;
    if (testCode) return;
    generateUserCode(answer?.answer[0].code) 
  }, [answer])

  return (
    <Card className={`${isCorrect()} p-4`}>
      <CardBody>
        <div className="flex flex-row">
          <div className="flex flex-col w-full lg:w-10/12">
            <p className="text-sm">Question: {index + 1} {answer?.correct === Correct.CHECK ? '(Requires input)' : answer?.correct === Correct.NO ? '(Failed)' : '(Passed)'}</p>
            <p className="font-bold text-lg mb-2">{question?.question.text}</p>
            {
              question?.question?.code &&
              <div className="markdown-body !mb-4 rounded-3xl">
                <pre>
                  <code className="highlight highlight-source-js" dangerouslySetInnerHTML={{__html: code}}>
                  </code>
                </pre>
              </div>
            }
          </div>
          {
            answer?.correct === Correct.CHECK &&
            <div className="flex flex-row w-2/12 gap-x-2 justify-end">
              <div onClick={() => updateQuestion('yes')} className="h-8 w-8 flex items-center justify-center rounded-full bg-white pt-1 hover:scale-105 cursor-pointer transition-all duration-500 hover:shadow-xl">
                <svg width={24} height={24} className="fill-primary scale-50">
                  <path d="M20.285 2 9 13.567 3.714 8.556 0 12.272 9 21 24 5.715z" />
                </svg>
              </div>
              <div onClick={() => updateQuestion('no')} className="h-8 w-8 flex items-center justify-center rounded-full bg-white hover:scale-105 cursor-pointer transition-all duration-500 hover:shadow-xl">
                <svg width={24} height={24} className="fill-danger scale-50">
                  <path d="m23 20.168-8.185-8.187L23 3.807 20.168 1l-8.182 8.179L3.81 1 1 3.81l8.186 8.196L1 20.19 3.81 23l8.203-8.192L20.193 23z" />
                </svg>
              </div>
            </div>
          }
        </div>
        <p className="mb-2 w-full lg:w-10/12"><span className="font-bold mr-2">ANSWER:</span>
        {
          answer?.answer && typeof answer?.answer !== 'string'
          ? (
            <>
              <div className="markdown-body !mb-4 !mt-4 rounded-3xl">
                <pre>
                  <code className="highlight highlight-source-js" dangerouslySetInnerHTML={{__html: testCode}}>
                  </code>
                </pre>
              </div>
              <div className="flex flex-row gap-6 ml-2">
                {
                  answer?.answer.map((x:TestResultsType, indx:number)=> (
                    <div className="flex flex-col gap-1">
                      <p className="font-bold">Test {indx+1}</p>
                      <p>Input: {x.input}</p>
                      <p>Output: {x.output}</p>
                      <p>Passed: {x.passed}</p>
                    </div>
                  ))
                }
              </div>
            </>
          )
          : answer?.answer
        }</p>
      </CardBody>
    </Card>
  );
}

export default AdminQuestion;
