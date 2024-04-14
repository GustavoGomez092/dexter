'use client'

import CodeEditor from '@/components/CodeEditor'
import ChallengePrompter from '@/components/ChallengePrompter'
import PerfectScrollbar from 'react-perfect-scrollbar'
import Console from '@/components/Console'
import MultipleChoice from '@/components/MultipleChoice'
import allTests from "@/tests"
import { DocumentData, collection, doc, getDoc, getDocs, limit, orderBy, query } from 'firebase/firestore'
import db from '@/providers/firebase'
import { useEffect, useState } from 'react'
import { Test } from '@/tests/test.type'
import { challengeStore } from '@/store/challengeStore'
import OpenQuestion from '@/components/OpenQuestion'

type AnswerType = {
  id: string | null,
  data: DocumentData
}

enum QuestionTypes {
  MULTIPLE_CHOICE = 'multipleChoice',
  CODE = 'code',
  TEXT = 'openQuestion'
}

export default function Page({ params }: { params: { slug: string } }) {

  const [test, setTest] = useState<Test|null|undefined>(null)
  const [currentAnswer, setCurrentAnswer] = useState<AnswerType|null>(null)
  const setCurrentQuestion = challengeStore((state) => state.setCurrentQuestion)
  const setTotalQuestions = challengeStore((state) => state.setTotalQuestions)
  const setChallengeInviteId = challengeStore((state) => state.setChallengeInviteId)
  const setAllowNext= challengeStore((state) => state.setAllowNext)
  const setChallengeComplete = challengeStore((state) => state.setComplete)
  const challengeInviteId = challengeStore((state) => state.challengeInviteId)

  const getTestById = (id: string) => {
    return allTests
      .map((test) => test.tests)
      .flat()
      .find((t) => t.id === id)
  }

  const getTestByInvitationId = async (id: string) => {
    setChallengeInviteId(id)
    setChallengeComplete(false)
    const challenge = await getDoc(doc(db, "Challenge", id))
    return getTestById(challenge.data()?.testId)
  }

  const getCurrentQuestion = async (questionNumber?: number) => {

    const ChallengeRef = collection(db, "Challenge", params.slug, "Answers");
    const querySnapshot = await getDocs(ChallengeRef);
    
    let lastAnswerId: string|null = null;
    let lastAnswer:DocumentData|null = null;

    if (!questionNumber) {
      if (querySnapshot.docs.length > 0) {
        lastAnswerId = querySnapshot.docs[querySnapshot.docs.length-1].id;
        lastAnswer = querySnapshot.docs[querySnapshot.docs.length-1].data();
        lastAnswer.type = test?.questions.find(q => q.id === lastAnswerId)?.question.type || null;
        lastAnswer.question = test?.questions.find(q => q.id === lastAnswerId)?.question || null;
      } else {
        lastAnswerId = test?.questions[0].id || null;
        lastAnswer = {
          question: test?.questions[0].question,
          answer: null,
          correct: 'no',
          type: test?.questions[0].question.type || null
        }
      }
    } else {
      lastAnswerId = test?.questions[questionNumber-1].id || null;
      lastAnswer = {
        question: test?.questions[questionNumber-1].question,
        answer: null,
        correct: 'no',
        type: test?.questions[questionNumber-1].question.type || null
      }
    }



    const index = (test?.questions.findIndex(q => q.id === lastAnswerId) || 0) + 1;


    if(index !== questionNumber && challengeInviteId) {

      setCurrentQuestion(index)
      setTotalQuestions(test?.questions.length || 0)
    }

    setCurrentAnswer({
      id: lastAnswerId,
      data: lastAnswer
    })
  }

  useEffect(() => {
    if (!test && params.slug) {
      const testGetter = async () => {
        const test = await getTestByInvitationId(params.slug)
        setTest(test)
      }
      testGetter()
    }
  }, [params.slug])

  let unsub:any;

  useEffect(() => {
    if (test) {
      setAllowNext(false)
      getCurrentQuestion()
      unsub = challengeStore.subscribe((current, previous) => {
        if (!current.currentQuestion) return
        if (!previous.currentQuestion) return
        if (current.currentQuestion !== previous.currentQuestion) {
          getCurrentQuestion(current.currentQuestion)
        }
        console.log('subbed')
      })
    }
  }, [test])

  useEffect(() => {
    return () => {
      if (unsub) {
        console.log('unsubbed')
        unsub()
      }
    }
  }, [])


  return (
    <main className="flex h-full flex-col items-center justify-between py-6">
    <div className="container flex-row lg:flex h-full gap-2">
      <div className="left-area w-full lg:w-6/12 h-full lg:h-[68vh] card-border">
      <PerfectScrollbar>
        <div className="question-area h-full">
          <ChallengePrompter title={"Question"} code={currentAnswer?.data.question?.code} prompt={currentAnswer?.data?.question?.text} />
        </div>
      </PerfectScrollbar>
      </div>
      <div className="right-area w-full h-full lg:h-[68vh] lg:w-6/12 card-border">
        {
          currentAnswer?.data.type === QuestionTypes.CODE && (
            <>
              <div className="editor-area h-96 lg:h-4/6 px-6 pt-2 overflow-hidden">
                <CodeEditor question={currentAnswer} testId={test?.id||null} invitationId={params.slug} />
              </div>
              <div className="console-area h-96 lg:h-2/6 px-6 py-2">
                <Console />
              </div>
            </>
          )
        }
        {
          currentAnswer?.data.type === QuestionTypes.MULTIPLE_CHOICE && (
            <MultipleChoice question={currentAnswer} testId={test?.id||null} invitationId={params.slug} />
          )
        }
        {
          currentAnswer?.data.type === QuestionTypes.TEXT && (
            <OpenQuestion question={currentAnswer} testId={test?.id||null} invitationId={params.slug} />
          )
        }
        <div className="output-area"></div>
      </div>    
    </div>
  </main>
  )
}