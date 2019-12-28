import React, {Component} from 'react';
import { Card, CardBody, CardTitle, CardHeader, Button } from 'reactstrap'
import CustomerDetails from './CustomerDetails'
import axios from 'axios'
import CONSTANTS from "./constants"

export default class Customers extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedCustomer: 1
    }
  }

  //function which is called the first time the component loads
  componentDidMount() {
    this.getCustomerData();
  }

  //Function to get the Customer Data from json
  getCustomerData() {
    axios.get(`${CONSTANTS.API_ROOT}/api/get`).then(response => {
      this.setState({customerList: response})
    })
  };
  
  render() {
    if (!this.state.customerList)
      return (<p>Loading data</p>)
    return (<div>
      <div className="col-md-3">
        {

          this.state.customerList.data.map(customer => <Card className="panel panel-info" key={customer.name}>
            <CardHeader className="panel-heading">
              <CardTitle className="panel-title">{customer.name}</CardTitle>
            </CardHeader>
            <CardBody className="panel-body">
              <p>{customer.email}</p>
              <p>{customer.phone}</p>
              <Button className="btn btn-info" onClick={() => this.setState({selectedCustomer: customer.id})}>

                Click to View Details

              </Button>

            </CardBody>
          </Card>)
        }
      </div>
      <div className="col-md-6">
        <CustomerDetails val={this.state.selectedCustomer} handler={this.getCustomerData.bind(this)}/>
      </div>
    </div>)
  }

}
