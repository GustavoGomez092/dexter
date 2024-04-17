'use client';
import db from '@/providers/firebase';
import { challengeStore } from '@/store/challengeStore';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Spinner,
} from '@nextui-org/react';
import { doc, getDoc } from 'firebase/firestore';
import { useState } from 'react';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

const ModalWindow = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: ((isOpen: boolean) => void) | undefined;
}) => {
  const [inviteCode, setInviteCode] = useState('');
  const [inviteCodeError, setInviteCodeError] = useState(false);
  const inviteCodeSchema = z.string().min(10).max(10);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const setInviteId = challengeStore((state) => state.setChallengeInviteId);
  const router = useRouter();

  const checkValidInviteCode = async () => {
    try {
      setLoading(true);
      const inviteCodeEval = await inviteCodeSchema.safeParseAsync(inviteCode);

      if (!inviteCodeEval.success) {
        setInviteCodeError(true);
        setErrorMessage('Invalid invite code, try again...');
        setLoading(false);
        throw new Error('Invalid invite code');
      } else {
        setErrorMessage('');
        setInviteCodeError(false);
      }

      const challenge = doc(db, 'Challenge', inviteCode);
      const docSnap = await getDoc(challenge);

      if (docSnap.exists()) {
        const challengeData = docSnap.data();
        setInviteId(inviteCode);
        router.push(`/admin/challenges/${challengeData.testId}`);
        setErrorMessage('');
        setInviteCodeError(false);
        setLoading(false);
      } else {
        setInviteCodeError(true);
        setErrorMessage('Invalid invite code, try again...');
        setLoading(false);
        throw new Error('Invalid invite code');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement='top-center'
      className='dark'
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1 text-text'>
              Enter your invite code
            </ModalHeader>
            <ModalBody className='dark'>
              <Input
                type='text'
                isRequired
                label='invite-code'
                placeholder='Paste your invite code here....'
                color='primary'
                variant='bordered'
                className='mb-2 text-text'
                isInvalid={inviteCodeError}
                value={inviteCode || ''}
                onChange={(e) => setInviteCode(e.target.value)}
              />
              {inviteCodeError && (
                <div className='alert mt-2 rounded-md border border-[#F31260] p-4'>
                  <p className='text-xs text-[#F31260]'>{errorMessage}</p>
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color='danger' variant='bordered' onPress={onClose}>
                <span className='font-bold text-danger'>Close</span>
              </Button>
              <Button color='primary' onPress={() => checkValidInviteCode()}>
                {loading ? (
                  <span className='ml-2'>
                    <Spinner color='white' />
                  </span>
                ) : (
                  <span className='font-bold text-text'>Let's GO!</span>
                )}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalWindow;
