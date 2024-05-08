'use client';

import ChallengePrompter from '@/components/ChallengePrompter';
import PerfectScrollbar from 'react-perfect-scrollbar';
import MultipleChoice from '@/components/MultipleChoice';
import allTests from '@/tests';
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
} from 'firebase/firestore';
import db from '@/providers/firebase';
import { useEffect, useState } from 'react';
import { Test } from '@/tests/test.type';
import { challengeStore } from '@/store/challengeStore';
import OpenQuestion from '@/components/OpenQuestion';
import SandPackEditor from '@/components/CodeEditor/CustomSandPackEditor';

type AnswerType = {
  id: string | null;
  data: DocumentData;
};

enum QuestionTypes {
  MULTIPLE_CHOICE = 'multipleChoice',
  CODE = 'code',
  TEXT = 'openQuestion',
}

export default function Page({ params }: { params: { slug: string } }) {
  const [test, setTest] = useState<Test | null | undefined>(null);
  const [currentAnswer, setCurrentAnswer] = useState<AnswerType | null>(null);
  const setCurrentQuestion = challengeStore(
    (state) => state.setCurrentQuestion
  );
  const setTotalQuestions = challengeStore((state) => state.setTotalQuestions);
  const setChallengeInviteId = challengeStore(
    (state) => state.setChallengeInviteId
  );
  const setAllowNext = challengeStore((state) => state.setAllowNext);
  const setChallengeComplete = challengeStore((state) => state.setComplete);
  const challengeInviteId = challengeStore((state) => state.challengeInviteId);

  const getTestById = (id: string) => {
    return allTests
      .map((test) => test.tests)
      .flat()
      .find((t) => t.id === id);
  };

  const getTestByInvitationId = async (id: string) => {
    setChallengeInviteId(id);
    setChallengeComplete(false);
    const challenge = await getDoc(doc(db, 'Challenge', id));
    return getTestById(challenge.data()?.testId);
  };

  const getCurrentQuestion = async (questionNumber?: number) => {
    const ChallengeRef = collection(db, 'Challenge', params.slug, 'Answers');
    const querySnapshot = await getDocs(ChallengeRef);

    let lastAnswerId: string | null = null;
    let lastAnswer: DocumentData | null = null;

    if (!questionNumber) {
      if (querySnapshot.docs.length > 0) {
        lastAnswerId = querySnapshot.docs[querySnapshot.docs.length - 1].id;
        lastAnswer = querySnapshot.docs[querySnapshot.docs.length - 1].data();
        lastAnswer.type =
          test?.questions.find((q) => q.id === lastAnswerId)?.question.type ||
          null;
        lastAnswer.question =
          test?.questions.find((q) => q.id === lastAnswerId)?.question || null;
      } else {
        lastAnswerId = test?.questions[0].id || null;
        lastAnswer = {
          question: test?.questions[0].question,
          answer: null,
          correct: 'no',
          type: test?.questions[0].question.type || null,
        };
      }
    } else {
      lastAnswerId = test?.questions[questionNumber - 1].id || null;
      lastAnswer = {
        question: test?.questions[questionNumber - 1].question,
        answer: null,
        correct: 'no',
        type: test?.questions[questionNumber - 1].question.type || null,
      };
    }

    const index =
      (test?.questions.findIndex((q) => q.id === lastAnswerId) || 0) + 1;

    if (index !== questionNumber && challengeInviteId) {
      setCurrentQuestion(index);
      setTotalQuestions(test?.questions.length || 0);
    }

    setCurrentAnswer({
      id: lastAnswerId,
      data: lastAnswer,
    });
  };

  useEffect(() => {
    if (!test && params.slug) {
      const testGetter = async () => {
        const test = await getTestByInvitationId(params.slug);
        console.log(test);
        setTest(test);
      };
      testGetter();
    }
  }, [params.slug]);

  let unsub: any;

  useEffect(() => {
    if (test) {
      setAllowNext(false);
      getCurrentQuestion();
      unsub = challengeStore.subscribe((current, previous) => {
        if (!current.currentQuestion) return;
        if (!previous.currentQuestion) return;
        if (current.currentQuestion !== previous.currentQuestion) {
          getCurrentQuestion(current.currentQuestion);
        }
      });
    }
  }, [test]);

  useEffect(() => {
    return () => {
      if (unsub) {
        unsub();
      }
    };
  }, []);

  return (
    <main className='flex h-full flex-col items-center justify-between py-6'>
      <div className='container h-full flex-row gap-2 lg:flex'>
        <div className='left-area card-border h-full w-full overflow-auto lg:h-[78vh] lg:w-6/12'>
          <PerfectScrollbar>
            <div className='question-area'>
              <ChallengePrompter
                title={'Question'}
                mainFile={currentAnswer?.data.question?.mainFile || ''}
                code={currentAnswer?.data.question?.code}
                prompt={currentAnswer?.data?.question?.text}
              />
            </div>
          </PerfectScrollbar>
        </div>
        <div className='right-area card-border h-full w-full overflow-auto lg:h-[78vh] lg:w-6/12'>
          {currentAnswer?.data.type === QuestionTypes.CODE && (
            <>
              <div className='editor-area h-full overflow-hidden px-2 py-2'>
                <SandPackEditor
                  question={currentAnswer}
                  testId={test?.id || null}
                  invitationId={params.slug}
                />
              </div>
            </>
          )}
          {currentAnswer?.data.type === QuestionTypes.MULTIPLE_CHOICE && (
            <MultipleChoice
              question={currentAnswer}
              testId={test?.id || null}
              invitationId={params.slug}
            />
          )}
          {currentAnswer?.data.type === QuestionTypes.TEXT && (
            <OpenQuestion
              question={currentAnswer}
              testId={test?.id || null}
              invitationId={params.slug}
            />
          )}
          <div className='output-area'></div>
        </div>
      </div>
    </main>
  );
}
