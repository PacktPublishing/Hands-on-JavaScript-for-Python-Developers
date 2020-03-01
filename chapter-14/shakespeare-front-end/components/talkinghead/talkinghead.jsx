import React from 'react'
import ReactTypingEffect from 'react-typing-effect';

import './talkinghead.css'
import TalkingHead from './shakespeare.png'

export default class TalkingHeadLayout extends React.Component {
  render() {
    return (
      <div id="talkinghead">
        <div className="prompt">
          <ReactTypingEffect text={this.props.response} speed="50" typingDelay="0" />
        </div>
        <img src={TalkingHead} alt="Speak, knave!" />
      </div>
    )
  }
}