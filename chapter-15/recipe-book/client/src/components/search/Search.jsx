import React from 'react'
import Button from 'react-bootstrap/Button'

import './Search.css'

class Search extends React.Component {
  constructor() {
    super()

    this.submitSearch = this.submitSearch.bind(this)
  }

  submitSearch(e) {
    e.preventDefault()

    fetch(`http://localhost:3000/search?q=${document.querySelector('#searchTerm').value}`)
      .then(data => data.json())
      .then((json) => {
        this.props.handleSearchResults(json)
      })
  }

  render() {
    return (
      <h3>Search for: <input type="text" id="searchTerm" />
      <Button onClick={this.submitSearch}>Search!</Button></h3>
    )
  }
}

export default Search