import React from 'react'
import { Button } from 'react-bootstrap'
import * as firebase from 'firebase'

const provider = new firebase.auth.GoogleAuthProvider();

export default class SignIn extends React.Component {
  constructor() {
    super()

    this.login = this.login.bind(this)
  }

  login() {
    const self = this

    firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      self.props.setUser(result.user);
      // ...
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }
  render() {
    return <Button onClick={this.login}>Sign In</Button>
  }
}