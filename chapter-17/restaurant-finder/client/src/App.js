import React from 'react'
import cookie from "react-cookies";

import Finder from './components/finder/Finder'
import SignIn from './components/signIn/SignIn'

import './App.css'

export default class App extends React.Component {
  constructor() {
    super()

    this.state = {
      user: cookie.load("username")
    }
    
    this.setUser = this.setUser.bind(this)
  }

  setUser(user) {
    this.setState({
      user: user
    })

    cookie.save("username", user)
  }

  render() {
    const { user } = this.state
    return (
      <div className="App">
        { (user) ? <Finder user={user} /> : <SignIn setUser={this.setUser} /> }
      </div>
    )
  }
}
