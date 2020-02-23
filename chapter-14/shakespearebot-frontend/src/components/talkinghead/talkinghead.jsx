import React from 'react'
import ReactTypingEffect from 'react-typing-effect';

import './talkinghead.css'
import TalkingHead from './shakespeare.png'

const insults = [
  "Away, you starvelling, you elf-skin, you dried neat's-tongue, bull's-pizzle, you stock-fish!",
  "Thou art a boil, a plague sore.",
  "Speak, knave!",
  "Away, you three-inch fool!",
  "I scorn you, scurvy companion.",
  "Thou sodden-witted lord! Thou hast no more brain than I have in mine elbows",
  "I am sick when I do look on thee",
  "Methink'st thou art a general offence and every man should beat thee."
]

export default class TalkingHeadLayout extends React.Component {
  render() {
    return (
      <div id="talkinghead">
        <div className="prompt">
          <ReactTypingEffect text={insults} speed="50" typingDelay="0" />
        </div>
        <img src={TalkingHead} alt="Speak, knave!" />
      </div>
    )
  }
}