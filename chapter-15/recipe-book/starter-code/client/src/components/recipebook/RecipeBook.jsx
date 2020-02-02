import React from 'react'
import Search from '../search/Search'
import Recipe from '../recipe/Recipe'

export default class RecipeBook extends React.Component {
  constructor() {
    super();
    this.state = {
      recipes: [],
      savedRecipes: []
    }

    this.handleSearchResults = this.handleSearchResults.bind(this)
  }

  handleSearchResults(data) {
    const recipes = []

    data.hits.forEach( (item) => {
      const recipe = item.recipe

      recipes.push({
        "title": recipe.label,
        "url": recipe.url,
        "image": recipe.image
      })
    })

    this.setState({
      recipes: recipes
    })
  }

  render() {
    const { recipes, savedRecipes } = this.state

    return (
      <>
        <Search handleSearchResults={this.handleSearchResults} />
        {
          recipes.length > 0 ? (
            recipes.map((recipe, i) => (
              <Recipe recipe={recipe} key={i} />
            ))
          ) : <p></p>
        }
      </>
    )
  }
}