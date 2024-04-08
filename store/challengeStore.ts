import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'

export type ChallengeStoreType = {
  challengeInviteId: string;
  currentQuestion: number;
  totalQuestions: number;
  allowNext: boolean;
  complete: boolean;
  setAllowNext: (value:boolean) => void;
  setTotalQuestions: (value:number) => void;
  setCurrentQuestion: (value:number) => void;
  setComplete: (value:boolean) => void;
  setChallengeInviteId: (value:string) => void;
  clearChallenge: () => void;
}
export const challengeStore = create<ChallengeStoreType>()(
  persist(
    devtools(
    (set, get):ChallengeStoreType => ({
      challengeInviteId: '',
      currentQuestion: 0,
      totalQuestions: 0,
      allowNext: false,
      complete: false,
      setAllowNext: (value:boolean) => set({ allowNext: value }),
      setTotalQuestions: (value:number) => set({ totalQuestions: value }),
      setCurrentQuestion: (value:number) => set({ currentQuestion: value }),
      setChallengeInviteId: (value:string) => set({ challengeInviteId: value }),
      setComplete: (value:boolean) => set({ complete: value }),
      clearChallenge: () => set({ challengeInviteId: '', currentQuestion: 0, totalQuestions: 0, allowNext: false, complete: false}),
    }),
    {
      trace: true,
      traaeLimit: 25,
    }
    ),
    {
      name: 'dexter-challenge-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)