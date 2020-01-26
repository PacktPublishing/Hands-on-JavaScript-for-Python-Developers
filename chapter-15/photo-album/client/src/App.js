import React from 'react'
import './App.css'

import Gallery from './components/gallery/Gallery'
import Upload from './components/upload/Upload'

function App() {
  return (
    <>
      <h1>Photo Gallery</h1>
      <Upload />
      <Gallery />

    </>
  );
}

export default App;
