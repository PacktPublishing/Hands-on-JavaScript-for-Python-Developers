import React from 'react'
import { Button } from 'react-bootstrap'
import Restaurant from '../restaurant/Restaurant'

export default class Search extends React.Component {
  constructor() {
    super()

    this.state = {
      businesses: []
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          lng: position.coords.longitude,
          lat: position.coords.latitude
        })
      })

    } else {
      this.setState({
        lng: null,
        lat: null
      })
    }

    this.search = this.search.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      val: e.target.value
    })
  }

  search(event) {
    const { lng, lat, val } = this.state

    fetch(`http://localhost:3000/search?categories=${val}&lat=${lat}&lng=${lng}`)
      .then(data => data.json())
      .then(data => this.handleSearchResults(data))
  }

  handleSearchResults(data) {
    this.setState({
      businesses: data.businesses
    })
  }

  render() {
    const { businesses } = this.state
    console.log(businesses)

    return (
      <>
        <h2>Enter a type of cuisine: <input type="text" onChange={this.handleChange} /> <Button id="search" onClick={this.search}>Search!</Button></h2>
        <div className="card-columns">
          {
            businesses.length > 0 ? (
              businesses.map((restaurant, i) => (
                <Restaurant restaurant={restaurant} key={i} />
              ))
            ) : <p>No results</p>
          }
        </div>
      </>
    )
  }
}