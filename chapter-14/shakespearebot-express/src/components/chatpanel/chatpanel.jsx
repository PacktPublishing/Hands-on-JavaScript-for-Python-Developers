import React from 'react'
import { Button, Row } from 'reactstrap'

import './chatpanel.css'

export default class ChatPanel extends React.Component {

  render() {
    return (
        <div className="user">
          <Row>
            <div className="input">
              <textarea type="text" className="form-control input-text" rows="3" id="question" />
            </div>
          </Row>
          <Row>
            <Button color="primary" onClick={this.props.speak}>Speak now!</Button>
          </Row>
        </div>
    )
  }
}