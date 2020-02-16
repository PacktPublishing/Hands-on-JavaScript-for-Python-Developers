import React from 'react'
import Database from '../database/database'
import { Tabs, Tab } from 'react-bootstrap'
import Search from '../search/Search'
import Restaurant from '../restaurant/Restaurant'

export default class Finder extends React.Component {
  constructor() {
    super()

    this.state = {
      restaurants: []
    }

    this.getRestaurants = this.getRestaurants.bind(this)
  }

  componentDidMount() {
    this.getRestaurants()
  }

  getRestaurants() {
    const { user } = this.props

    Database.ref(`/restaurants/${user.uid}`).on('value', (snapshot) => {
      const restaurants = []

      const data = snapshot.val()

      for(let restaurant in data) {
        restaurants.push(data[restaurant])
      }
      this.setState({
        restaurants: restaurants
      })
    })
  }

  render() {
    const { user } = this.props
    const { restaurants } = this.state
    return (
      <>
        <h1>Let's find some restaurants!</h1>

        <Tabs defaultActiveKey="search" id="restaurantsearch">
          <Tab eventKey="search" title="Search!">
            <Search handleSearchResults={this.handleSearchResults} user={user}/>
          </Tab>
          <Tab eventKey="saved" title="Saved!">
            <div className="card-columns">
              {
                restaurants.length > 0 ? (
                  restaurants.map((restaurant, i) => (
                    <Restaurant restaurant={restaurant} saved={true} key={i} user={user} />
                  ))
                ) : <p>No saved restaurants</p>
              }
            </div>
          </Tab>
        </Tabs>
      </>
    )
  }
}
