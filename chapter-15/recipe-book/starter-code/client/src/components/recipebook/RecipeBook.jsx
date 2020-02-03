import React from 'react'
import Search from '../search/Search'
import Recipe from '../recipe/Recipe'
import { Container, Row, Col } from 'react-bootstrap'

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
        <h1>Recipe Book</h1>
        <Container>
          <Row>
            <Col>
              <Search handleSearchResults={this.handleSearchResults} />

              {
                recipes.length > 0 ? (
                  <>
                    <p>Search Results</p>
                    <div className="card-columns">
                      {
                        recipes.map((recipe, i) => (
                          <Recipe recipe={recipe} key={i} search="true" refresh={this.refresh} />
                        ))
                      }
                    </div>
                  </>
                ) : <p></p>
              }
            </Col>
            <Col>
              <h3>Saved Recipes</h3> 
              <div className="card-columns">
                {
                  savedRecipes.length > 0 ? (
                    savedRecipes.map((recipe, i) => (
                      <Recipe recipe={recipe[Object.keys(recipe)]} key={i} />
                    ))
                  ) : <p>No saved Recipes</p>
                }
              </div>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}