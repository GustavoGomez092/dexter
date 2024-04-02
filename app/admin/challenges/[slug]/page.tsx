"use client"

import useUUID from "@/hooks/useUUID"
import db from "@/providers/firebase"
import { DocumentData, collection, doc, getDocs, onSnapshot, query, setDoc, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import allTests from "@/tests"
import { Chip, Snippet } from "@nextui-org/react"
import AdminQuestion from "@/components/AdminQuestion"
import { challengeStore } from "@/store/challengeStore"

export default function Page({ params }: { params: { slug: string } }) {
  const { getShortUUID } = useUUID()
  const savedChallengeId = challengeStore((state: any) => state.challengeInviteId)
  const persistChallengeId = challengeStore((state: any) => state.setChallengeInviteId)
  const [challengeId, setChallengeId] = useState<string | null>(null)
  const [started, setStarted] = useState(false)
  const [answers, setAnswers] = useState<DocumentData[]>([])

  const getAnswersListener = async (challengeId: string) => {
    onSnapshot(
      query(
        collection(
          db, "Challenge", challengeId, "Answers"
        )
      ), (querySnapshot) => {
      const newAnswers:DocumentData[] = []
      querySnapshot.forEach((doc) => {
        console.log(doc.data())
        newAnswers.push({ id: doc.id, data: doc.data() })
      });
      setAnswers(newAnswers)
    });
  }


  const getTestById = (id: string) => {
    return allTests
      .map((test) => test.tests)
      .flat()
      .find((t) => t.id === id)
  }

  const selectedTest = getTestById(params.slug)

  const ChallengeStartedListener = (path: string) => {
    onSnapshot(doc(db, "Challenge", path), (doc: DocumentData) => {
      const collectionData = doc.data()
      setStarted(collectionData.started)
    })
  }

  const createChallenge = async (path: string) => {
    await setDoc(doc(db, "Challenge", path), {
      test: selectedTest?.name,
      testId: selectedTest?.id,
      started: false,
    })

    await setDoc(doc(db, "Challenge", path, 'Answers', 'JS_inter_001_001'), {
      answer: "A closure is a function having access to the parent scope, even after the parent function has closed.",
      question: 'What is a Closure in JavaScript?',
      correct: 'no',
    })

    ChallengeStartedListener(path)
    getAnswersListener(path)
  }

  useEffect(() => {
    if (!savedChallengeId) {
      const id = getShortUUID()
      setChallengeId(id)
      persistChallengeId(id)
    } else {
      setChallengeId(savedChallengeId)
    }
  }, [])

  useEffect(() => {
    if (challengeId) {
      createChallenge(challengeId)
    }
  }, [challengeId])



  return (
    <main className="flex h-full flex-col items-center justify-between py-6">
      <div className="container flex-row lg:flex h-full gap-2">
        <div className="container flex flex-col gap-4">
          <div className="top-area flex flex-col max-w-[450px] mb-16">
            <div className="flex flex-row gap-x-6 items-center mb-2">
              <h1 className="text-3xl text-text font-bold w-10/12">
                {selectedTest?.name}
              </h1>
              <Chip color={started ? "primary" : "danger"} className="w-2/12">
                {started ? "started" : "not started"}
              </Chip>
            </div>
            <p className="text-text mb-6">{selectedTest?.description}</p>
            <p className="text-text mb-2">Invitation code:</p>
            <Snippet color="primary">{challengeId}</Snippet>
          </div>
          <div className="flex flex-row gap-x-16">
            <div className="flex flex-col gap-4 w-full lg:w-1/2">
              <h2 className="text-xl text-text font-bold">Real-time test</h2>
              {
                answers && answers.map((answer: DocumentData, index: number) => {
                  console.log(answers)
                  return (                  
                    <AdminQuestion
                      key={`admin-question-${index}`}
                      index={index}
                      challengeId={challengeId}
                      questionId={answer.id}
                    />
                  )
                })
              }
            </div>
            <div className="flex flex-col gap-4 w-full lg:w-1/2">
              <h2 className="text-xl text-text font-bold">Insights</h2>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
