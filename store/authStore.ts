import { create } from 'zustand';
import { AuthStoreType } from './authStore.types';
import { User } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { auth } from '@/providers/firebase';

export const authStore = create<AuthStoreType>((set) => ({
  user: {} as User,
  isLogged: false,
  loading: true,
  logIn: (userData: User) =>
    set(() => ({ user: userData, isLogged: true, loading: false })),
  logOut: async () => {
    await signOut(auth);
    set(() => {
      return { user: {} as User, isLogged: false, loading: false };
    });
  },
  setUser: (userData: User) => set(() => ({ user: userData })),
  setLoading: (loading: boolean) => set(() => ({ loading })),
}));
