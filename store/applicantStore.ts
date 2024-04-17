import { create } from 'zustand';
import { Applicant, ApplicantStoreType } from './applicantStore.type';
import { auth } from '@/providers/firebase';
import { signOut } from 'firebase/auth';
import { createJSONStorage, persist } from 'zustand/middleware';

export const applicantStore = create<ApplicantStoreType>()(
  persist(
    (set, get): ApplicantStoreType => ({
      name: '',
      email: '',
      inviteId: '',
      loading: true,
      logIn: (applicantData: Applicant) =>
        set(() => ({
          name: applicantData.name,
          email: applicantData.email,
          inviteId: applicantData.inviteId,
          loading: false,
        })),
      isLoggedIn: () =>
        (get() as ApplicantStoreType).inviteId !== '' ? true : false,
      logOut: async () => {
        await signOut(auth);
        set(() => ({ name: '', email: '', inviteId: '' }));
        localStorage.removeItem('dexter-applicant-storage');
      },
      setLoading: (loading: boolean) => set(() => ({ loading: loading })),
    }),
    {
      name: 'dexter-applicant-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
