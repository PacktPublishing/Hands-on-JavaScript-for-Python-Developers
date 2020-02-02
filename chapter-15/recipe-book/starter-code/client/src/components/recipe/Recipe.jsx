import React from 'react'
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
    .then( (data) => {
      this.props.refresh(data)
    })
  }

  render() {
    const { recipe } = this.props
    console.log(recipe)

    return (
      <div className="card">
        <img src={recipe.image} className="card-img-top" alt={recipe.title} />
        <div className="card-body">
          <h5 className="card-title">{recipe.title}</h5>
          <a href={recipe.url} className="btn btn-primary" target="_blank">See Recipe</a>
          {this.props.search && <a className="btn btn-primary" onClick={this.save}>Add to Box</a>}
        </div>
      </div>
    )
  }
}