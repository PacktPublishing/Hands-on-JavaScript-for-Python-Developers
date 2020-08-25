import React from 'react'
import {
  Link
} from 'react-router-dom'

import login from './login.svg'

import dashboard from './dashboard.svg'

function Toolbar() {

  return (
    <div className="Toolbar">
      <div className="tool log-in">
        <img src={login} alt="Log In" />
      </div>

      <>
        <Link to="/">
          <div className="tool dashboard">
            <img src={dashboard} alt="dashboard" />
          </div>
        </Link>
      </>
    </div>
  )
}

export default Toolbar