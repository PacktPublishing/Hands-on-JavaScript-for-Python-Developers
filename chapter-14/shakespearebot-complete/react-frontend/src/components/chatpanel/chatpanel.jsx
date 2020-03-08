import React from 'react'
import { Button, Row, Container } from 'reactstrap'

import './chatpanel.css'

export default class ChatPanel extends React.Component {

  render() {
    return (
        <Container className="user">
          <Row>
            <div>
              <textarea type="text" className="form-control input-text" id="question" />
            </div>
          </Row>
          <Row>
            <Button color="primary" onClick={this.props.speak}>Speak now!</Button>
          </Row>
        </Container>
    )
  }
}