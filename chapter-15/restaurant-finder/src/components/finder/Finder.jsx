import React from 'react'
import Database from '../database/database'

export default class Finder extends React.Component {
  constructor() {
    super()

    Database.ref('/test').set({
      helloworld: 'Hello, World'
    })
  }

  render() {
    return <h1>Let's find some restaurants!</h1>
  }
}
