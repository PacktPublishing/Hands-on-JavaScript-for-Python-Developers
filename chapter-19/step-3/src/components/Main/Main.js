import React, { useContext, useEffect } from 'react'
import Header from '../Header/Header'
import Toolbar from '../Toolbar/Toolbar'
import Dashboard from '../Dashboard/Dashboard'
import Editor from '../Editor/Editor'
import Login from '../Login/Login'
import { useCookies } from 'react-cookie'

import UserContext from '../UserContext'
import { Container, Row, Col } from 'react-bootstrap'

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Map from '../Map/Map'
import Story from '../Story/Story'

function Main() {
  const [loggedIn, setLoggedIn] = useContext(UserContext)
  const [cookies, setCookie] = useCookies(['logged-in'])

  const setOrCheckLoggedIn = (status) => {
    if (cookies['logged-in'] === 'true' || status) {
      setLoggedIn(true)
    }

    if (status && cookies['logged-in'] !== 'true') {
      setCookie('logged-in', true)
    }
  }

  useEffect(() => {
    setOrCheckLoggedIn()
  })

  return (
    <Router>
      <Container className="Container">
        <Row>
          <Col xs={1}>
            <Toolbar doLogin={setOrCheckLoggedIn} />
          </Col>
          <Col>
            <div className="Main">
              <Header />
              {!loggedIn &&
                <Switch>
                  <Route exact path="/">
                    <Story />
                    <Login doLogin={setOrCheckLoggedIn} />
                  </Route>
                </Switch>
              }

              {loggedIn &&
                <Switch>
                  <Route exact path="/" component={Dashboard} />
                  <Route exact path="/editor" component={Editor} />
                  <Route exact path="/map" component={Map} />
                </Switch>
              }
            </div>
          </Col>
        </Row>
      </Container>
    </Router>
  )
}
export default Main