import React, { useRef, useEffect } from 'react'
import Editor from '@monaco-editor/react'

function CodeEditor({ value, onChange, language = 'javascript', readOnly = false }) {
  const editorRef = useRef(null)

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor

    // Configure JSX/React language support
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      jsx: monaco.languages.typescript.JsxEmit.React,
      reactNamespace: 'React',
      allowJs: true,
      typeRoots: ['node_modules/@types']
    })

    // Add React types for better IntelliSense
    monaco.languages.typescript.javascriptDefaults.addExtraLib(`
      declare module "react" {
        export interface Props {
          children?: any;
        }
        export function useState<T>(initialState: T): [T, (newState: T) => void];
        export function useEffect(effect: () => void | (() => void), deps?: any[]): void;
        export function useContext<T>(context: any): T;
        export function createContext<T>(defaultValue?: T): any;
        export const createElement: any;
        export default any;
      }
    `, 'file:///node_modules/@types/react/index.d.ts')

    // Focus editor
    editor.focus()
  }

  const handleEditorChange = (newValue) => {
    if (onChange && newValue !== undefined) {
      onChange(newValue)
    }
  }

  const editorOptions = {
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    fontSize: 14,
    lineHeight: 22,
    fontFamily: '"Fira Code", "Monaco", "Menlo", "Ubuntu Mono", monospace',
    tabSize: 2,
    insertSpaces: true,
    automaticLayout: true,
    wordWrap: 'on',
    lineNumbers: 'on',
    glyphMargin: false,
    folding: false,
    lineDecorationsWidth: 10,
    lineNumbersMinChars: 3,
    renderLineHighlight: 'line',
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: readOnly,
    cursorStyle: 'line',
    accessibilitySupport: 'auto',
    suggest: {
      insertMode: 'replace',
      filterGraceful: true,
      showKeywords: true,
      showSnippets: true,
      showClasses: true,
      showFunctions: true,
      showVariables: true,
    },
    quickSuggestions: {
      other: true,
      comments: false,
      strings: false
    },
    acceptSuggestionOnCommitCharacter: true,
    acceptSuggestionOnEnter: 'on',
    snippetSuggestions: 'top',
    // JSX/React specific
    bracketPairColorization: {
      enabled: true
    },
    guides: {
      bracketPairs: true,
      indentation: true
    }
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
          <span className="text-sm font-medium text-gray-600">
            {language === 'javascript' ? 'JavaScript/JSX' : language}
          </span>
        </div>
      </div>
      
      <div className="h-64">
        <Editor
          height="100%"
          language={language}
          value={value}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={editorOptions}
          theme="light"
        />
      </div>
    </div>
  )
}

export default CodeEditor 