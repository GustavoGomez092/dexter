import { create } from 'zustand'
import { Applicant, ApplicantStoreType } from './applicantStore.type'
import { auth } from '@/providers/firebase'
import { signOut } from 'firebase/auth'

export const applicantStore = create<ApplicantStoreType>((set, get) => ({
  name: '',
  email: '',
  inviteId: '',
  loading: true,
  logIn: (applicantData:Applicant) => set(() => ({ name: applicantData.name, email: applicantData.email, inviteId: applicantData.inviteId, loading: false})),
  isLoggedIn: () => get().inviteId !== '' ? true : false,
  logOut: async () => {
    await signOut(auth)
    set(() => ({ applicant: { name: '', email: ''}, inviteId: ''}))
  },
  setLoading: (loading: boolean) => set(() => ({ loading: loading })),
}))
