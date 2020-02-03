import React from 'react'
import { Button, Card } from 'react-bootstrap'

import './Recipe.css'

export default class Recipe extends React.Component {
  constructor() {
    super();

    this.save = this.save.bind(this)
  }
  save(e) {
    e.preventDefault()

    const recipe = { [this.props.recipe.title]: this.props.recipe }

    fetch('http://localhost:3000/recipes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recipe)
    })
    .then(json => json.json())
    .then((data) => {
      this.props.refresh(data)
    })
  }

  openRecipe(e) {
    window.open(e.target.dataset.url)
  }

  render() {
    const { recipe } = this.props

    return (
      <Card>
        <Card.Img variant="top" src={recipe.image} alt={recipe.title} />
        <Card.Body>
          <Card.Title>{recipe.title}</Card.Title>
          <Button variant="primary" data-url={recipe.url} onClick={this.openRecipe}>See Recipe</Button>
          {this.props.search && <Button variant="secondary" onClick={this.save}>Add to Book</Button>}
        </Card.Body>
      </Card>
    )
  }
}