import React from 'react'
import Database from '../database/database'
import { Tabs, Tab } from 'react-bootstrap'
import Search from '../search/Search'

export default class Finder extends React.Component {
  constructor() {
    super()

    this.Database = Database
  }

  render() {
    return (
      <>
        <h1>Let's find some restaurants!</h1>

        <Tabs defaultActiveKey="search" id="restaurantsearch">
          <Tab eventKey="search" title="Search!">
            <Search handleSearchResults={this.handleSearchResults} />
          </Tab>
          <Tab eventKey="saved" title="Saved!">
            {/* <div className="card-columns">
              {
                savedRecipes.length > 0 ? (
                  savedRecipes.map((recipe, i) => (
                    <Recipe recipe={recipe[Object.keys(recipe)]} key={i} />
                  ))
                ) : <p>No saved Recipes</p>
              }
            </div> */}
          </Tab>
        </Tabs>
      </>
    )
  }
}
