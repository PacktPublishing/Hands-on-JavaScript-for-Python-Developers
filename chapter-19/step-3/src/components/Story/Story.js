import React, { useState } from 'react'
import LoremIpsum from './LoremIpsum'
import Photo from '../Photo/Photo'

function Story() {

  const [story, setStory] = useState({ text: LoremIpsum, album: 'Portugal, 2020', location: 'Praia das Furnas, 12 July' })

  return (
    <div className="Story">
      <div className="single-story">
        <Photo />
        <h3>{story.album}</h3>
        <h4>{story.location}</h4>
        <>{story.text}</>
      </div>
    </div>
  )

}

export default Story