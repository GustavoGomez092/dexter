import { useRouter } from 'next/navigation';
import { ApplicantStoreType } from './../store/applicantStore.type';
import { applicantStore } from '@/store/applicantStore';
import { useEffect } from 'react';

export const useCandidateAuthVerifier = () => {
  const logged = applicantStore((state:ApplicantStoreType)=> state.isLoggedIn);
  const router = useRouter()
  const loading = applicantStore((state:ApplicantStoreType)=> state.applicantInfo.loading);
  const setLoading = applicantStore((state:ApplicantStoreType)=> state.setLoading);

  useEffect(()=>{
    setLoading(true)
    if(logged()){
      router.push('/candidate/waiting-room')
    }else{
      router.push('/auth/invite')
    }
    setLoading(false)
  }, [])

  return {loading}

}