import React from 'react'

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
      <h2>Search for: <input type="text" id="searchTerm" />
      <button onClick={this.submitSearch}>Search!</button></h2>
    )
  }
}

export default Search