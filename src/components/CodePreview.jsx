import React, { useState, useEffect, useMemo } from 'react'
import { AlertTriangle, Eye, Code } from 'lucide-react'

function CodePreview({ code, challenge }) {
  const [previewContent, setPreviewContent] = useState(null)
  const [error, setError] = useState(null)
  const [showRawOutput, setShowRawOutput] = useState(false)

  // Simple JSX-to-HTML converter for basic cases
  const convertJSXToHTML = (jsxCode) => {
    if (!jsxCode || !jsxCode.trim()) return ''

    try {
      // Remove import statements and function declarations for preview
      let cleanCode = jsxCode
        .replace(/import\s+.*?from\s+['"].*?['"];?\s*/g, '')
        .replace(/function\s+\w+\s*\([^)]*\)\s*{/g, '')
        .replace(/const\s+\w+\s*=\s*\([^)]*\)\s*=>\s*{/g, '')
        .replace(/^\s*return\s*\(/m, '')
        .replace(/^\s*return\s+/m, '')
        .replace(/}$/, '')
        .replace(/;$/, '')
        .trim()

      // Remove closing parenthesis for return statements
      if (cleanCode.endsWith(')')) {
        cleanCode = cleanCode.slice(0, -1)
      }

      // Handle simple JSX elements
      if (cleanCode.startsWith('<') && cleanCode.endsWith('>')) {
        // Simple tag replacement for basic preview
        let htmlCode = cleanCode
          // Handle self-closing tags
          .replace(/<(\w+)([^>]*?)\s*\/>/g, '<$1$2></$1>')
          // Handle JSX expressions in text content
          .replace(/\{([^}]+)\}/g, (match, expression) => {
            // Simple expression evaluation for preview
            if (expression.includes('props.')) {
              return `[${expression}]`
            }
            if (expression.includes('count')) {
              return '0'
            }
            if (expression.includes('name')) {
              return 'Alice'
            }
            if (expression.includes('text')) {
              return 'sample text'
            }
            if (expression.includes('user')) {
              return 'true'
            }
            if (expression.includes('theme')) {
              return 'light'
            }
            // Try to evaluate simple expressions
            try {
              if (/^['"`].*['"`]$/.test(expression)) {
                return expression.slice(1, -1)
              }
              if (/^\d+$/.test(expression)) {
                return expression
              }
              if (expression === 'true') return 'true'
              if (expression === 'false') return 'false'
              return `{${expression}}`
            } catch {
              return `{${expression}}`
            }
          })
          // Handle onClick attributes
          .replace(/onClick=\{[^}]+\}/g, 'onclick="void(0)"')
          // Handle other event handlers
          .replace(/on\w+=\{[^}]+\}/g, '')
          // Handle value and onChange for inputs
          .replace(/value=\{[^}]+\}/g, 'value="sample"')
          .replace(/onChange=\{[^}]+\}/g, '')
          // Handle className
          .replace(/className=/g, 'class=')

        return htmlCode
      }

      // Handle component calls
      if (cleanCode.includes('<')) {
        return cleanCode
      }

      // Handle plain text or expressions
      return cleanCode
    } catch (error) {
      throw new Error(`Preview error: ${error.message}`)
    }
  }

  const previewHTML = useMemo(() => {
    if (!code) return ''
    
    try {
      setError(null)
      return convertJSXToHTML(code)
    } catch (err) {
      setError(err.message)
      return ''
    }
  }, [code])

  useEffect(() => {
    if (previewHTML && !error) {
      setPreviewContent(previewHTML)
    } else {
      setPreviewContent(null)
    }
  }, [previewHTML, error])

  const getExpectedPreview = () => {
    if (!challenge?.expectedCode) return null
    
    try {
      return convertJSXToHTML(challenge.expectedCode)
    } catch {
      return challenge.expectedCode
    }
  }

  return (
    <div className="space-y-4">
      {/* Live Preview */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Eye className="h-5 w-5" />
            <span>Live Preview</span>
          </h3>
          
          <button
            onClick={() => setShowRawOutput(!showRawOutput)}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1"
          >
            <Code className="h-4 w-4" />
            <span>{showRawOutput ? 'Show Rendered' : 'Show Raw'}</span>
          </button>
        </div>

        <div className="min-h-32 border-2 border-dashed border-gray-200 rounded-lg p-4 bg-gray-50">
          {error ? (
            <div className="flex items-start space-x-2 text-red-600">
              <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium">Preview Error</div>
                <div className="text-sm">{error}</div>
              </div>
            </div>
          ) : previewContent ? (
            <div className="preview-content">
              {showRawOutput ? (
                <pre className="code-block text-xs whitespace-pre-wrap">
                  {previewContent}
                </pre>
              ) : (
                <div 
                  className="rendered-output"
                  dangerouslySetInnerHTML={{ __html: previewContent }}
                />
              )}
            </div>
          ) : (
            <div className="text-gray-400 text-center py-8">
              <Code className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Your code preview will appear here</p>
            </div>
          )}
        </div>
      </div>

      {/* Expected Output */}
      {challenge?.expectedCode && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Expected Output</h3>
          <div className="min-h-24 border border-green-200 rounded-lg p-4 bg-green-50">
            <div 
              className="expected-output text-green-800"
              dangerouslySetInnerHTML={{ __html: getExpectedPreview() || challenge.expectedCode }}
            />
          </div>
        </div>
      )}

      {/* Test Cases */}
      {challenge?.testCases && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h3>
          <div className="space-y-2">
            {challenge.testCases.map((testCase, index) => {
              const passed = code ? testCase.test(code.trim()) : false
              
              return (
                <div 
                  key={index}
                  className={`flex items-center space-x-2 p-2 rounded text-sm ${
                    passed 
                      ? 'bg-green-50 text-green-700' 
                      : 'bg-gray-50 text-gray-600'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${
                    passed ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                  <span>{testCase.description}</span>
                  {passed && <span className="text-green-600">✓</span>}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default CodePreview 