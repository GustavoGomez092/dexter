import db from "@/providers/firebase";
import { challengeStore } from "@/store/challengeStore";
import { Textarea } from "@nextui-org/react";
import { DocumentData, doc, setDoc } from "firebase/firestore";


const OpenQuestion = ({question, testId, invitationId}: {question: DocumentData, testId:string|null, invitationId:string|null }) => {

  const setAllowNext = challengeStore((state) => state.setAllowNext)

  const setOption = async (e:React.ChangeEvent<HTMLInputElement>) => {

    // save the answer to the database
    if (!testId || !invitationId) return

    await setDoc(doc(db, 'Challenge', invitationId, 'Answers', question.id), {
      answer: e.target.value,
      question: question?.data?.question?.text,
      correct: 'check'
    })

    if(e.target.value.length > 5) {
      setAllowNext(true)
    } else {
      setAllowNext(false)
    }

  }

  const debounce = (callback:Function, wait:number = 300) => {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args:any) => {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => callback.apply(context, args), wait);
    };
  }

  const debouncedSave = debounce(setOption, 1000);

  return (
    <div className="dark h-full w-full flex items-center px-6">
    <Textarea
      isRequired
      minRows={10}
      maxRows={10}
      label="Answer"
      defaultValue=""
      onChange={(e)=>debouncedSave(e)}
      labelPlacement="outside"
      placeholder="Your answer goes here..."
      className="w-full"
    />
    </div>
  );
}


export default OpenQuestion;