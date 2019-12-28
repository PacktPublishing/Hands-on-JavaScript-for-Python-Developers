import React, { Component } from 'react'
import { Form, FormGroup, FormControl, Label, Panel,  } from "react-bootstrap"
import CONSTANTS from "./constants"
import axios from 'axios'
const uuidv4 = require('uuid/v4');

//This Component is a child Component of Customers Component
export default class CustomerNew extends Component {

  constructor(props) {
    super(props);

    const details = {
      data: {
        id: uuidv4(),
        name: "",
        phone: "",
        email: "",
        city: "",
        state: "",
        country: "",
        organization: "",
        jobProfile: "",
        additionalInfo: ""
      }
    };

    this.state = {
      customerDetails: details,
      validate: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  //Function which is called when the component loads for the first time
  componentDidMount() {
    console.log(this.state.customerDetails.data.id)
    this.getCustomerDetails(this.state.customerDetails.data.id)
  }

  //Function which is called whenver the component is updated
  componentDidUpdate(prevProps) {

    //get Customer Details only if props has changed
    if (this.props.val !== prevProps.val) {
      this.getCustomerDetails(this.state.customerDetails.id)
    }
  }

  //Function to Load the customerdetails data from json.
  getCustomerDetails(id) {
    axios.get(`${CONSTANTS.API_ROOT}/api/get/` + id).then(response => {
      this.setState({ customerDetails: response })
    })
  };

  handleChange(event) {
    const details = this.state.customerDetails;
    console.log(details);
    details.data[event.target.name] = event.target.value;

    this.setState({ customerDetails: details });
    console.log(this.state.customerDetails);

    axios.post(`${CONSTANTS.API_ROOT}/api/save/` + details.data.id, details);
  };

  validateEmail(e) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state
    if (emailRex.test(e.target.value)) {
      validate.emailState = 'has-success'
    } else {
      validate.emailState = 'has-danger'
    }
    this.setState({ validate })
  }

  render() {
    if (!this.state.customerDetails) {
      return (<p>Loading Data</p>)
    }

    return (<div className="customerdetails">
      <Panel bsStyle="info" className="centeralign">
        <Panel.Heading>
          <Panel.Title componentClass="h3">{this.state.customerDetails.data.name}</Panel.Title>
        </Panel.Heading>
        <Panel.Body>

          <Form>
            <FormGroup>
              <Label>Name:</Label>
              <FormControl name="name" type="text" value={this.state.customerDetails.data.name} onChange={this.handleChange} />
            </FormGroup>

            <FormGroup controlId="formBasicEmail">
              <Label>Email:</Label>
              <FormControl
                name="email"
                type="email"
                value={this.state.customerDetails.data.email}
                onChange={this.handleChange}
                valid={this.state.validate.emailState && this.state.validate.emailState === 'has-success'}
                invalid={this.state.validate.emailState && this.state.validate.emailState === 'has-danger'}
                onBlur={this.validateEmail}
              />
            </FormGroup>

            <FormGroup>
              <Label>Phone:</Label>
              <FormControl name="phone" type="number" value={this.state.customerDetails.data.phone} onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <Label>City:</Label>
              <FormControl name="city" type="text" value={this.state.customerDetails.data.city} onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <Label>State:</Label>
              <FormControl name="state" type="text" value={this.state.customerDetails.data.state} onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <Label>Country:</Label>
              <FormControl name="country" type="text" value={this.state.customerDetails.data.country} onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <Label>Organization:</Label>
              <FormControl name="organization" type="text" value={this.state.customerDetails.data.organization} onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <Label>Job Profile:</Label>
              <FormControl name="jobProfile" type="text" value={this.state.customerDetails.data.jobProfile} onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <Label>Additional Info:</Label>
              <FormControl name="additionalInfo" type="text" value={this.state.customerDetails.data.additionalInfo} onChange={this.handleChange} />
            </FormGroup>

          </Form>
        </Panel.Body>
      </Panel>
    </div>)
  }
}

