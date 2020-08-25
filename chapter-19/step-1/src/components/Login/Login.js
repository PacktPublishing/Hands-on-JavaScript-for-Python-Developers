import React from 'react'

const Login = () => {

  return (
    <>
      <div className="Login">
        <h1>Log In</h1>

        <p><input type="text" name="username" id="username" /></p>
        <p><input type="password" name="password" id="password" /></p>
        <p><button type="submit">Go</button></p>
      </div>
    </>
  )
}

export default Login