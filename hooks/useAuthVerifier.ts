import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../providers/firebase';
import { useRouter } from 'next/navigation';
import { authStore } from '@/store/authStore';
import { useEffect } from 'react';

export const useAuthVerifier = () => {
  const router = useRouter()
  const loading = authStore((state)=> state.loading)
  const setLoading = authStore((state)=> state.setLoading)
  const logIn = authStore((state)=> state.logIn)

  useEffect(()=>{
    setLoading(true)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        logIn(user)
        router.push('/admin/challenges')
        setLoading(false)
      } else {
        router.push('/auth/signin')
        setLoading(false)
      }
    });
  }, [])

  
  return {loading}


}