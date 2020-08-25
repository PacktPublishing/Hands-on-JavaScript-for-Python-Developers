import React, { useContext } from 'react'
import UserContext from '../UserContext'

const Login = (props) => {

  let [loggedIn, setLoggedIn] = useContext(UserContext)

  const logMeIn = () => {
    loggedIn = !loggedIn
    props.doLogin(loggedIn)
  }

  return (
    <>
      <div className="Login">
        <h1>Log In</h1>

        <p><input type="text" name="username" id="username" /></p>
        <p><input type="password" name="password" id="password" /></p>
        <p><button type="submit" onClick={logMeIn}>Go</button></p>
      </div>
    </>
  )
}

export default Login