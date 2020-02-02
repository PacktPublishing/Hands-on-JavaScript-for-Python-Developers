import React from 'react'

export default class Recipe extends React.Component {
  render() {
    const recipe = this.props.recipe

    return (
      <div className="card">
        <img src={recipe.image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{recipe.title}</h5>
          <a href={recipe.url} className="btn btn-primary" target="_blank">See Recipe</a>
          <a className="btn btn-primary">Add to Box</a>
        </div>
      </div>
    )
  }
}