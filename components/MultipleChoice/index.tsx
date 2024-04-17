import db from '@/providers/firebase';
import { challengeStore } from '@/store/challengeStore';
import { Radio, RadioGroup, cn } from '@nextui-org/react';
import { DocumentData, doc, setDoc } from 'firebase/firestore';

const MultipleChoice = ({
  question,
  testId,
  invitationId,
}: {
  question: DocumentData;
  testId: string | null;
  invitationId: string | null;
}) => {
  const setAllowNext = challengeStore((state) => state.setAllowNext);

  const setOption = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // save the answer to the database
    if (!testId || !invitationId) return;

    const correctOption = question?.data?.question?.options.find(
      (option: any) => option.correct
    );

    await setDoc(doc(db, 'Challenge', invitationId, 'Answers', question.id), {
      answer: e.target.value,
      question: question?.data?.question?.text,
      correct: correctOption.text === e.target.value ? 'yes' : 'no',
    });

    setAllowNext(true);
  };

  return (
    <div className='flex h-full w-full items-center dark'>
      <RadioGroup
        className='w-full px-4'
        label=''
        onChange={(e) => setOption(e)}
      >
        {question?.data?.question?.options &&
          question?.data?.question?.options.map(
            (option: any, index: number) => {
              return (
                <CustomRadio key={`option-${index}`} value={option.text}>
                  {option.text}
                </CustomRadio>
              );
            }
          )}
      </RadioGroup>
    </div>
  );
};

export const CustomRadio = (props: any) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          'inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between',
          'flex-row-reverse w-full max-w-full min-h-24 cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent',
          'data-[selected=true]:border-primary bg-info text-white hover:bg-blue-800'
        ),
      }}
    >
      {children}
    </Radio>
  );
};

export default MultipleChoice;
