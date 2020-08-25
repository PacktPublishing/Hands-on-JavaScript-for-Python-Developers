import React, { useContext } from 'react'
import UserContext from '../UserContext'
import { useCookies } from 'react-cookie'

import {
  Link
} from 'react-router-dom'

import login from './login.svg'

import dashboard from './dashboard.svg'

function Toolbar(props) {
  const [loggedIn, setLoggedIn] = useContext(UserContext)
  const [cookies, setCookie] = useCookies(['logged-in'])

  const logMeOut = () => {
    setCookie('logged-in', false)
    setLoggedIn(false)
  }

  return (
    <div className="Toolbar">
      <div className="tool log-in">
        {loggedIn &&
          <>
            <img src={login} onClick={logMeOut} alt="Log Out" />
            <Link to="/">
              <div className="tool dashboard">
                <img src={dashboard} alt="dashboard" />
              </div>
            </Link>
          </>
        }
      </div>

      <>

      </>
    </div>
  )
}

export default Toolbar