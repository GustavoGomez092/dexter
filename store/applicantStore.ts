import { create } from 'zustand'
import { Applicant, ApplicantStoreType } from './applicantStore.type'

export const applicantStore = create<ApplicantStoreType>((set, get) => ({
  name: '',
  email: '',
  inviteId: '',
  loading: true,
  logIn: (applicantData:Applicant) => set(() => ({ name: applicantData.name, email: applicantData.email, inviteId: applicantData.inviteId, loading: false})),
  isLoggedIn: () => get().inviteId !== '' ? true : false,
  logOut: () => set(() => ({ applicant: { name: '', email: ''}, inviteId: ''})),
  setLoading: (loading: boolean) => set(() => ({ loading: loading })),
}))
