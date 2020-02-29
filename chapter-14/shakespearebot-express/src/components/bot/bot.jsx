import React from 'react'
import TalkingHeadLayout from '../talkinghead/talkinghead'
import ChatPanel from '../chatpanel/chatpanel'

export default class Bot extends React.Component {
  constructor() {
    super()

    this.state = {
      text: [
        "Away, you starvelling, you elf-skin, you dried neat's-tongue, bull's-pizzle, you stock-fish!",
        "Thou art a boil, a plague sore.",
        "Speak, knave!",
        "Away, you three-inch fool!",
        "I scorn you, scurvy companion.",
        "Thou sodden-witted lord! Thou hast no more brain than I have in mine elbows",
        "I am sick when I do look on thee",
        "Methink'st thou art a general offence and every man should beat thee."
      ]
    }

    this.captureInput = this.captureInput.bind(this)
  }


  captureInput(e) {
    const question = document.querySelector('#question').value
    fetch(`/speak?question=${question}`)
      .then((response) => response.text())
      .then((data) => {
        this.setState({
          text: `${data}`
        })
      })
  }

  render() {
    const { text } = this.state

    return (
      <div className="App">
        <ChatPanel speak={this.captureInput} />
        <TalkingHeadLayout response={text} />
      </div>
    )
  }
}