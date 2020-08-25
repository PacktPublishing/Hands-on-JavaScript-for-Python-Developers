import React from 'react'
import { useQuill } from 'react-quilljs'

import 'quill/dist/quill.snow.css' // Add css for snow theme
import { Button } from 'react-bootstrap'

const Editor = () => {
  const { quill, quillRef } = useQuill()

  const save = () => {
    fetch('/api/article/edit', {
      method: 'POST',
      body: JSON.stringify({ article: quill.root.innerHTML }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => console.log(json))
  }

  return (
    <div className="Editor" style={{ width: 850, height: 300 }}>
      <div className="editor" ref={quillRef} />

      <Button onClick={save}>Save</Button>
    </div>
  )
}

export default Editor