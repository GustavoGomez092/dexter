import { codeEditorStore } from "@/store/codeEditorStore"
import { getQuickJS, shouldInterruptAfterDeadline } from "quickjs-emscripten"


export const useJS = () => {

  const evalJS = async (code: string): Promise<any> => {
    try {
      const consoleOutput = codeEditorStore.getState().consoleOutput
      const quickJS = await getQuickJS()

      const vm = quickJS.newContext()

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

  const runTest = async (code: string, functionName:string, input: any, output: any): Promise<{output: string, status: string}> => {
    try {
      // prepare input and output
      switch (typeof input) {
        case 'string':
          input = `'${input}'`;
          break;
        case 'object':
          input = JSON.stringify(input);
          break;
        case 'undefined':
          input = '';
          break;
        case 'boolean':
          input = input.toString();
          break;
        case 'number':
          input = input.toString();
          break;
        default: ''
      }

      try {
        const consoleOutput = codeEditorStore.getState().consoleOutput
        const quickJS = await getQuickJS()
  
        const vm = quickJS.newContext()
        // `console.log`
        const logHandle = vm.newFunction("log", (...args):any => {
          const nativeArgs = args.map(vm.dump)
        })
        // Partially implement `console` object
        const consoleHandle = vm.newObject()
        vm.setProp(consoleHandle, "log", logHandle)
        vm.setProp(vm.global, "console", consoleHandle)
  
        consoleHandle.dispose()
        logHandle.dispose()
  
        const result = vm.unwrapResult(vm.evalCode(`
${code}

${functionName}(${input})
        `))
  
        const finalResult = vm.getString(result) === "undefined" ? '' : vm.getString(result);
  
        result.dispose()
        vm.dispose()
  
        if(finalResult.toString() === output.toString()) {
          return {
            output: finalResult,
            status: 'pass'
          }
        } else {
          return {
            output: finalResult,
            status: 'fail'
          }
        }
      }
      catch (e:any) {
        return e.message
      }
        
    }
    catch (e:any) {
      return e.message
    }
  }

  return {
    evalJS,
    runTest
  }
}