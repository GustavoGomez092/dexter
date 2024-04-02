import { useRouter } from 'next/navigation';
import { applicantStore } from '@/store/applicantStore';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/providers/firebase';


export const useCandidateAuthVerifier = () => {
  const router = useRouter()
  const loading = applicantStore((state)=> state.loading);
  const setLoading = applicantStore((state)=> state.setLoading);

  
  useEffect(()=>{
    setLoading(true)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false)
      } else {
        router.push('/auth/invite')
        setTimeout(() => setLoading(false), 1000)
      }
    });
  }, [])


  return {loading}

}