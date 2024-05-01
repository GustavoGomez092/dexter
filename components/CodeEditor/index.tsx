'use client';

import Editor from '@monaco-editor/react';
import { DocumentData } from 'firebase/firestore';
import { getHighlighter } from 'shiki';
import { shikiToMonaco } from '@shikijs/monaco';
import { useRef } from 'react';
import { codeEditorStore } from '@/store/codeEditorStore';
import {
  useActiveCode,
  SandpackStack,
  useSandpack,
  FileTabs,
} from '@codesandbox/sandpack-react';

const CodeEditor = ({
  question,
  testId,
  invitationId,
}: {
  question: DocumentData;
  testId: string | null;
  invitationId: string | null;
}) => {
  const editorRef = useRef<any>(null);

  const setCode = codeEditorStore((state) => state.setCode);
  const setLanguage = codeEditorStore((state) => state.setLanguage);

  const currentCode = (value: string) => {
    setCode(value);
    setLanguage(setLanguageOnEditor());
    updateCode(value || '');
  };

  //sandpack bindings
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

  const handleEditorWillMount = async (monaco: any) => {
    // Create the highlighter, it can be reused
    const highlighter = await getHighlighter({
      themes: ['github-dark-default'],
      langs: ['html', 'css', 'html', 'typescript', 'javascript', 'json'],
    });
    monaco.languages.register({ id: 'html' });
    monaco.languages.register({ id: 'css' });
    monaco.languages.register({ id: 'typescript' });
    monaco.languages.register({ id: 'javascript' });
    monaco.languages.register({ id: 'json' });

    const newTheme = highlighter.getTheme('github-dark-default');
    if (newTheme.colors) {
      newTheme.colors['symbolIcon.constantForeground'] = '#1fb2a6';
    }

    // Register the themes from Shiki, and provide syntax highlighting for Monaco.
    shikiToMonaco(highlighter, monaco);
  };

  const setLanguageOnEditor = () => {
    switch (true) {
      case sandpack.activeFile.includes('ts'):
        return 'typescript';
      case sandpack.activeFile.includes('html'):
        return 'html';
      case sandpack.activeFile.includes('css'):
        return 'css';
      case sandpack.activeFile.includes('json'):
        return 'json';
      default:
        return 'javascript';
    }
  };

  return (
    <>
      <SandpackStack style={{ height: '100%', width: '77%', margin: 0 }}>
        <div style={{ flex: 1, height: '100%' }}>
          <FileTabs />
          <Editor
            className='h-[calc(100%-40px)]'
            language={setLanguageOnEditor()}
            options={{
              fontSize: 16,
              minimap: {
                enabled: false,
              },
              wordWrap: 'on',
            }}
            key={sandpack.activeFile}
            onChange={(value) => currentCode(value || '')}
            defaultValue={code}
            beforeMount={(monaco) => handleEditorWillMount(monaco)}
            onMount={handleEditorDidMount}
            theme='github-dark-default'
          />
        </div>
      </SandpackStack>
    </>
  );
};

export default CodeEditor;
