import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../providers/firebase';
import { useRouter } from 'next/navigation';
import { authStore } from '@/store/authStore';
import { useEffect } from 'react';

export const useAuthVerifier = () => {
  const router = useRouter();
  const loading = authStore((state) => state.loading);
  const setLoading = authStore((state) => state.setLoading);
  const setUser = authStore((state) => state.setUser);
  const logout = authStore((state) => state.logOut);

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.isAnonymous) {
          logout();
        } else {
          setUser(user);
          setTimeout(() => setLoading(false), 1000);
        }
      } else {
        router.push('/auth/signin');
        setTimeout(() => setLoading(false), 1000);
      }
    });
  }, []);

  return { loading };
};
