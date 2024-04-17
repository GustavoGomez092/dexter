"use client"

import useUUID from "@/hooks/useUUID"
import db from "@/providers/firebase"
import { DocumentData, collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import allTests from "@/tests"
import { Chip, Snippet, Button } from "@nextui-org/react"
import AdminQuestion from "@/components/AdminQuestion"
import { challengeStore } from "@/store/challengeStore"
import PieChart from '@/components/PieChart'
import Link from "next/link"

type ChallengeSummary = {
email?: string,
name?: string
started?: boolean
test?: string
testId?: string
}

export default function Page({ params }: { params: { slug: string } }) {
  const { getShortUUID } = useUUID()
  const savedChallengeId = challengeStore((state: any) => state.challengeInviteId)
  const persistChallengeId = challengeStore((state: any) => state.setChallengeInviteId)
  const [challengeId, setChallengeId] = useState<string | null>(null)
  const [started, setStarted] = useState(false)
  const [answers, setAnswers] = useState<DocumentData[]>([])
  const [challengeData, setChallengeData] = useState<ChallengeSummary>()

  const getAnswersListener = async (challengeId: string) => {
    onSnapshot(
      query(
        collection(
          db, "Challenge", challengeId, "Answers"
        )
      ), (querySnapshot) => {
      const newAnswers:DocumentData[] = []
      querySnapshot.forEach((doc) => {
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
      setChallengeData(collectionData)
      setStarted(collectionData.started)
    })
  }

  const createChallenge = async (path: string) => {
    const challenge = doc(db, "Challenge", path);
    const docSnap = await getDoc(challenge);

    ChallengeStartedListener(path)
    getAnswersListener(path)
    
    if (docSnap.exists()) return;

    await setDoc(doc(db, "Challenge", path), {
      test: selectedTest?.name,
      testId: selectedTest?.id,
      started: false,
    })
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

  console.log(selectedTest)

  return (
    <main className="flex h-full flex-col items-center justify-between py-6">
      <div className="container flex-row lg:flex h-full gap-2">
        <div className="container flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-16 mb-16">
          <div className="top-area flex flex-col w-full lg:w-1/2">
            <div className="max-w-[500px]">
              <Link href="/admin/challenges" className="w-fit">
                <Button color="primary" className="w-fit mb-6"><span className="font-bold text-text">← Back to challenges</span></Button>
              </Link>
              <div className="flex flex-row gap-x-6 items-center mb-2">
                <h1 className="text-3xl text-text font-bold w-10/12">
                  {selectedTest?.name}
                </h1>
                <Chip color={started ? "primary" : "danger"} className="w-2/12">
                  {started ? "started" : "not started"}
                </Chip>
              </div>
              <p className="text-text mb-6">{selectedTest?.description}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full lg:w-1/2">
              <div className="w-full">
                <p className="text-text mb-2 font-bold">Login URL:</p>
                <Snippet color="primary" className="w-full">{`${window.location.hostname}/auth/invite`}</Snippet>
              </div>
              <div className="w-full">
                <p className="text-text mb-2 font-bold">Invitation code:</p>
                <Snippet color="primary" className="w-full">{challengeId}</Snippet>
              </div>
            </div>
          </div>
          <div className="flex flex-col-reverse lg:flex-row gap-x-16">
            <div className="flex flex-col gap-4 w-full lg:w-1/2">
              <h2 className="text-xl text-text font-bold pb-4 border-b-white/30 border-b">Real-time test</h2>
              {
                answers && answers.map((answer: DocumentData, index: number) => {
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
            <div className="flex flex-col w-full lg:w-1/2 sticky h-fit top-16 z-1">
              <h2 className="text-xl text-text font-bold pb-4 border-b-white/30 border-b">Insights</h2>
              {
                challengeData && (
                  <div className="my-6">
                    <h3 className="text-xl text-text leading-snug"><span className="font-bold">Participant:</span> {challengeData?.name}</h3>
                    <p className="text-text"><span className="font-bold">Email:</span> {challengeData?.email}</p>
                  </div>
                )
              }
              <div className="flex flex-col gap-2">
                <div className="flex flex-row justify-between">
                  <p className="text-text">Total questions</p>
                  <p className="text-text">{selectedTest?.questions.length}</p>
                </div>
                <div className="flex flex-row justify-between">
                  <p className="text-text">Pending questions</p>
                  <p className="text-text">{selectedTest?.questions && selectedTest?.questions.length - answers.length}</p>
                </div>
                <div className="flex flex-row justify-between">
                  <p className="text-text">Correct answers</p>
                  <p className="text-text">{answers.filter((a) => a.data.correct === "yes").length}</p>
                </div>
                <div className="flex flex-row justify-between">
                  <p className="text-text">Incorrect answers</p>
                  <p className="text-text">{answers.filter((a) => a.data.correct === "no").length}</p>
                </div>
                <div className="flex flex-row justify-between">
                  <p className="text-text">Answers pending check</p>
                  <p className="text-text">{answers.filter((a) => a.data.correct === "check").length}</p>
                </div>
              </div>
              <div className="chart">
                <PieChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
