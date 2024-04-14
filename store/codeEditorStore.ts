import { create } from 'zustand'


type CodeEditorStoreType = {
  code: string;
  language: string;
  testInput: string;
  output: string;
  testOutput: string;
  consoleOutput: string;
  clearConsoleOutput: () => void;
  clearOutput: () => void;
  clearTestOutput: () => void;
  setConsoleOutput: (value:string) => void;
  setOutput: (value:string) => void;
  setTestOutput: (value:string) => void;
  setTestInput: (value:string) => void;
  setLanguage: (value:string) => void;
  setCode: (value:string) => void;
}

export const codeEditorStore = create<CodeEditorStoreType>((set, get) => ({
  code: '',
  language: '',
  testInput: '',
  output: '',
  consoleOutput: '',
  testOutput: '',
  clearConsoleOutput: () => set({ consoleOutput: '' }),
  clearOutput: () => set({ output: '' }),
  clearTestOutput: () => set({ testOutput: '' }),
  setConsoleOutput: (value:string) => set({ consoleOutput: value }),
  setOutput: (value:string) => set({ output: value }),
  setTestOutput: (value:string) => set({ testOutput: value }),
  setTestInput: (value:string) => set({ testInput: value }),
  setLanguage: (value:string) => set({ language: value }),
  setCode: (value:string) => set({ code: value }),
}))