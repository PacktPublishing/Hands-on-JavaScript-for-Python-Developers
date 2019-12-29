import React, { Component } from 'react'
import { Form, FormGroup, Input, Label, Card, CardHeader, CardTitle, CardBody, Button } from "reactstrap"
import CONSTANTS from "./constants"
import axios from 'axios'
const uuidv4 = require('uuid/v4');

//This Component is a child Component of Customers Component
export default class CustomerNew extends Component {

  constructor(props) {
    super(props);

    this.id = uuidv4();

    this.state = {
      validate: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  //Function which is called when the component loads for the first time
  componentDidMount() {
    this.getCustomerDetails(this.id)
  }

  //Function which is called whenver the component is updated
  componentDidUpdate(prevProps) {

    //get Customer Details only if props has changed
    if (this.props.val !== prevProps.val) {
      this.getCustomerDetails(this.id)
    }
  }

  //Function to Load the customerdetails data from json.
  getCustomerDetails(id) {
    axios.get(`${CONSTANTS.API_ROOT}/api/get/${id}`).then(response => {
      response.data.id = this.id
      this.setState({ customerDetails: response})
    })
  };

  handleChange(event) {
    const details = this.state.customerDetails;

    details.data[event.target.name] = event.target.value;

    this.setState({ customerDetails: details });
    console.log(this.state.customerDetails);

    axios.post(`${CONSTANTS.API_ROOT}/api/save/` + details.data.id, details);
  };

  render() {
    if (!this.state.customerDetails) {
      return (<p>Loading Data</p>)
    }

    return (<div className="customerdetails">
      <Card className="centeralign">
        <CardHeader>
          <CardTitle>{this.state.customerDetails.data.name || ''}</CardTitle>
        </CardHeader>
        <CardBody>

          <Form>
            <FormGroup>
              <Label>Name:</Label>
              <Input name="name" type="text" value={this.state.customerDetails.data.name || ''} onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <Label>Email:</Label>
              <Input
                name="email"
                type="email"
                value={this.state.customerDetails.data.email || ''}
                onChange={this.handleChange}
                valid={this.state.validate.emailState && this.state.validate.emailState === 'has-success'}
                invalid={this.state.validate.emailState && this.state.validate.emailState === 'has-danger'}
                onBlur={this.validateEmail}
              />
            </FormGroup>

            <FormGroup>
              <Label>Phone:</Label>
              <Input name="phone" type="number" value={this.state.customerDetails.data.phone || ''} onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <Label>City:</Label>
              <Input name="city" type="text" value={this.state.customerDetails.data.city || ''} onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <Label>State:</Label>
              <Input name="state" type="text" value={this.state.customerDetails.data.state || ''} onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <Label>Country:</Label>
              <Input name="country" type="text" value={this.state.customerDetails.data.country || ''} onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <Label>Organization:</Label>
              <Input name="organization" type="text" value={this.state.customerDetails.data.organization || ''} onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <Label>Job Profile:</Label>
              <Input name="jobProfile" type="text" value={this.state.customerDetails.data.jobProfile || ''} onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <Label>Additional Info:</Label>
              <Input name="additionalInfo" type="text" value={this.state.customerDetails.data.additionalInfo || ''} onChange={this.handleChange} />
            </FormGroup>

            <Button href="/customer/list" className="btn btn-primary">Save and Return</Button>
          </Form>
        </CardBody>
      </Card>
    </div>)
  }
}

