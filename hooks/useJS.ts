import { codeEditorStore } from "@/store/codeEditorStore"
import { getQuickJS } from "quickjs-emscripten"


export const useJS = () => {

  const evalJS = async (code: string): Promise<any> => {
    try {
      const consoleOutput = codeEditorStore.getState().consoleOutput
      const quickJS = await getQuickJS()

      const vm = quickJS.newContext()
      // `console.log`
      const logHandle = vm.newFunction("log", (...args):any => {
        const nativeArgs = args.map(vm.dump)
        console.log(...nativeArgs)
        codeEditorStore.setState({ consoleOutput: `<p>${consoleOutput}</p><p>${nativeArgs.join(" ")}</p>` })
      })
      // Partially implement `console` object
      const consoleHandle = vm.newObject()
      vm.setProp(consoleHandle, "log", logHandle)
      vm.setProp(vm.global, "console", consoleHandle)

      consoleHandle.dispose()
      logHandle.dispose()

      const result = vm.unwrapResult(vm.evalCode(`${code}`))

      const finalResult = vm.getString(result) === "undefined" ? '' : vm.getString(result);

      result.dispose()
      vm.dispose()

      return finalResult
    }
    catch (e:any) {
      return e.message
    }
  }

  return {
    evalJS
  }
}