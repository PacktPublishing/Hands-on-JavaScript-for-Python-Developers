import React from 'react'
import Photo from '../Photo/Photo'
import {
  Link
} from "react-router-dom"

import { Row, Container, Card } from 'react-bootstrap'
import edit from './edit.svg'
import globe from './globe.svg'
import add from './add.svg'

const Dashboard = () => {
  return (
    <>
      <Photo />
      <Container className="Dashboard">
        <Row>
          <Card className="tool cities">
            <Card.Img src={globe} alt="12 Countries Visitied" />
            <Card.Title>12</Card.Title>
            <Card.Text>Countries Visited</Card.Text>
          </Card>
          <Card className="tool add">
            <Link to='/editor'>
              <Card.Img src={add} alt="Add Trip" />
              <Card.Text>Add Trip</Card.Text>
            </Link>
          </Card>
          <Card className="tool edit">
            <Card.Img src={edit} alt="Edit Trip" />
            <Card.Text>Edit Trip</Card.Text>
          </Card>
        </Row>
      </Container>
    </>
  )
}

export default Dashboard