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
    this.refresh = this.refresh.bind(this)
  }

  componentDidMount() {
    fetch('http://localhost:3000/recipes')
      .then(data => data.json())
      .then( (json) => {
        console.log(json)
        this.setState({
          savedRecipes: json
        })
      })
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

  refresh(data) {
    this.setState({
      savedRecipes: data
    })
  }

  render() {
    const { recipes, savedRecipes } = this.state

    return (
      <>
        <Search handleSearchResults={this.handleSearchResults} />
        {
          recipes.length > 0 ? (
            <>
              <p>Search Results</p>
              {
                recipes.map((recipe, i) => (
                  <Recipe recipe={recipe} key={i} search="true" refresh={this.refresh} />
                ))
              }
            </>
          ) : <p></p>
        }
        <h3>Saved Recipes</h3> 
        {
          savedRecipes.length > 0 ? (
            savedRecipes.map((recipe, i) => (
              <Recipe recipe={recipe[Object.keys(recipe)]} key={i} />
            ))
          ) : <p>No saved Recipes</p>
        }
      </>
    )
  }
}