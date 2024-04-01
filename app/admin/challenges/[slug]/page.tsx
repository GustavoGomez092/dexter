"use client"

import useUUID from "@/hooks/useUUID"
import db from "@/providers/firebase"
import { DocumentData, doc, onSnapshot, setDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import allTests from "@/tests"
import { Chip, Snippet } from "@nextui-org/react"
import AdminQuestion, { Correct } from "@/components/AdminQuestion"

export default function Page({ params }: { params: { slug: string } }) {
  const { getShortUUID } = useUUID()
  const [challengeId, setChallengeId] = useState<string | null>(null)
  const [started, setStarted] = useState(false)

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

    ChallengeStartedListener(path)
  }

  useEffect(() => {
    if (!challengeId) {
      setChallengeId(getShortUUID())
    }
  }, [])

  useEffect(() => {
    if (challengeId) {
      createChallenge(challengeId)
    }
  }, [challengeId])

  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-between py-6">
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
              <AdminQuestion
                index={0}
                questionId="JS_inter_001_001"
                answer="Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis."
                correct={Correct.CHECK}
              />
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
