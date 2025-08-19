import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

function App() {
  const [ count, setCount ] = useState(0)
  const [ code, setCode ] = useState(` function sum() {
  return 1 + 1
}`)

  const [ review, setReview ] = useState(``)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    const response = await axios.post('http://localhost:3000/ai/get-review', { code })
    setReview(response.data)
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"JetBrains Mono", "Fira Code", monospace',
  fontSize: 16,
  lineHeight: 1.5,
  color: '#E0E6ED',                // Muted off-white for easy legibility
  backgroundColor: '#1C2531',     // Deep, cool-toned background
  border: '1px solid #3A4A5E',     // Subtle cool gray border
  borderRadius: '6px',
  height: '100%',
  width: '100%',
  padding: '12px',
  boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.5)',  // Provides inner depth
  overflow: 'auto',
  transition: 'box-shadow 0.2s ease-in-out',
  transitionProperty: 'box-shadow, border-color',
              }}
            />
          </div>
          <div
            onClick={reviewCode}
            className="review">Review</div>
        </div>
        <div className="right">
          <Markdown

            rehypePlugins={[ rehypeHighlight ]}

          >{review}</Markdown>
        </div>
      </main>
    </>
  )
}



export default App
