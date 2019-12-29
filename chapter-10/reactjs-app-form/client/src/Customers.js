import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardHeader, Button } from 'reactstrap'
import CustomerDetails from './CustomerDetails'
import axios from 'axios'
import CONSTANTS from "./constants"
const uuidv4 = require('uuid/v4');

export default class Customers extends Component {

  constructor(props) {
    super(props)
    this.state = {}

    this.update = this.update.bind(this);
  }

  //function which is called the first time the component loads
  componentDidMount() {
    this.getCustomerData(true);
  }

  //Function to get the Customer Data from json
  getCustomerData(initial) {
    axios.get(`${CONSTANTS.API_ROOT}/api/get`).then(response => {
      this.setState({
        customerList: response
      })

      let customerID

      if (!response.data.length) {
        customerID = uuidv4()  
      } else {
        customerID = response.data[0].id
      }

      if (initial === true) {
        this.setState({
          selectedCustomer: customerID
        })
      }
    })
  };

  update() {
    this.getCustomerData(true);
    this.setState({
      state: this.state
    })
  }

  render() {
    if (!this.state.customerList)
      return (<p>Loading data</p>)
    return (<div>
      <div className="col-md-3">
        {
          this.state.customerList.data.map(customer => <Card className="panel panel-info" key={customer.id}>
            <CardHeader className="panel-heading">
              <CardTitle className="panel-title">{customer.name}</CardTitle>
            </CardHeader>
            <CardBody className="panel-body">
              <p>{customer.email}</p>
              <p>{customer.phone}</p>
              <Button className="btn btn-info" onClick={() => this.setState({ selectedCustomer: customer.id })}>

                Click to View Details

              </Button>
            </CardBody>
          </Card>
          )
        }

        <Button className="btn btn-info" onClick={() => this.setState({ selectedCustomer: uuidv4() })}>Add New</Button>

      </div>
      <div className="col-md-6">
        <CustomerDetails val={this.state.selectedCustomer} handler={this.getCustomerData.bind(this)} update={this.update} />
      </div>
    </div>)
  }
}
