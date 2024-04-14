import { codeEditorStore } from "@/store/codeEditorStore"
import "./style.css"
import { useJS } from "@/hooks/useJS"
import { useEffect, useState } from "react"
import { Victor_Mono } from "next/font/google"
import { Chip } from "@nextui-org/react"
const font = Victor_Mono({ weight: "400", subsets: ["latin"] })

export default function index() {
  const [result, setResult] = useState("")
  const consoleOutput = codeEditorStore((state) => state.consoleOutput)
  const clearConsoleOutput = codeEditorStore((state) => state.clearConsoleOutput)

  const code = codeEditorStore((state) => state.code)

  const { evalJS } = useJS()

  useEffect(() => {
    const getResult = async () => {
      const JSresult = await evalJS(code)
      setResult(JSresult)
    }
    getResult()
  }, [code])

  return (
    <div className="flex gap-4 h-full">
      <div className="bg-[#161b22] rounded-sm p-6 h-full dark w-1/2 overflow-auto">
        <div className="flex">
          <p
            className={`${font.className} text-text text-[12px] opacity-40 mb-4`}
          >
            Output:
          </p>
        </div>
        <div className={`${font.className} text-text text-[16px]`}>
          {result}
        </div>
      </div>
      <div className="bg-[#161b22] rounded-sm p-6 h-full dark w-1/2 overflow-auto">
      <div className="flex justify-between">
          <p
            className={`${font.className} text-text text-[12px] opacity-40 mb-4`}
          >
            Console:
          </p>
          <Chip color="danger" onClick={()=> clearConsoleOutput()} className="cursor-pointer hover:scale-105">clear</Chip>
        </div>
        <div className={`${font.className} text-text text-[16px]`} dangerouslySetInnerHTML={{ __html: consoleOutput }}>
        </div>
      </div>
    </div>
  )
}
