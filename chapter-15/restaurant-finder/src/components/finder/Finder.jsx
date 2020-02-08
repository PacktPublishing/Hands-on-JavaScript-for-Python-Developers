import React from 'react'
import Database from '../database/database'

export default class Finder extends React.Component {
  constructor() {
    super()
    console.log('hello');

    Database.ref('/test').set({
      helloworld: 'Goodbye, Cruel World'
    })
  }

  render() {
    return <h1>Key={process.env.REACT_APP_apiKey}</h1>
  }
}
