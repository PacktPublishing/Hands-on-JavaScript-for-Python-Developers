import React from 'react'
import { Button, Card } from 'react-bootstrap'
import Database from '../database/database'

import './Restaurant.css'

export default class Restaurant extends React.Component {
  constructor() {
    super();

    this.saveRestaurant = this.saveRestaurant.bind(this)
  }


  saveRestaurant(e) {
    const { restaurant, user } = this.props

    Database.ref(`/restaurants/${user.uid}/${restaurant.id}`).set({
      ...restaurant
    })
  }

  render() {
    const { restaurant } = this.props

    return (
      <Card>
        <Card.Img variant="top" src={restaurant.image_url} alt={restaurant.name} />
        <Card.Body>
          <Card.Title>{restaurant.name}</Card.Title>
          {!this.props.saved && <Button variant="primary" onClick={this.saveRestaurant}>Save Restaurant</Button>}
       </Card.Body>
      </Card>
    )
  }
}