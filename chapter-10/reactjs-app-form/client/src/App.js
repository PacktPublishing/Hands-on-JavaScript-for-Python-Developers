import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Customers from './Customers'
import CustomerNew from './CustomerNew'
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

class App extends Component {
  render() {
    return (

      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Customers</h1>
        </header>
          <Switch>
                <Route exact path= "/" render={() => (
                  <Redirect to="/customer/list"/>
                )}/>
                 <Route exact path='/customer/list' component={Customers} />
                 <Route exact path='/customer/new' component={CustomerNew} />
          </Switch>
      </div>
    </Router>
    );
  }
}

export default App;
