import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type ChallengeStoreType = {
  challengeInviteId: string;
  setChallengeInviteId: (value:string) => void;
}
export const challengeStore = create(
  persist(
    (set, get):ChallengeStoreType => ({
      challengeInviteId: '',
      setChallengeInviteId: (value:string) => set({ challengeInviteId: value }),
    }),
    {
      name: 'dexter-challenge-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)