import { create } from 'zustand'
import { AuthStore } from './authStore.types'

export const authStore = create((set) => ({
  state: {
    user: null,
    isLogged: false
  },
  logIn: () => set((state:AuthStore) => ({ ...state, isLogged: true })),
  logOut: () => set(()=> ({ user: null, isLogged: false })),
}))
