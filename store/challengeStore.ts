import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type ChallengeStoreType = {
  challengeInviteId: string;
  currentQuestion: number;
  totalQuestions: number;
  setTotalQuestions: (value:number) => void;
  setCurrentQuestion: (value:number) => void;
  setChallengeInviteId: (value:string) => void;
}
export const challengeStore = create<ChallengeStoreType>()(
  persist(
    (set, get):ChallengeStoreType => ({
      challengeInviteId: '',
      currentQuestion: 0,
      totalQuestions: 0,
      setTotalQuestions: (value:number) => set({ totalQuestions: value }),
      setCurrentQuestion: (value:number) => set({ currentQuestion: value }),
      setChallengeInviteId: (value:string) => set({ challengeInviteId: value }),
    }),
    {
      name: 'dexter-challenge-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)