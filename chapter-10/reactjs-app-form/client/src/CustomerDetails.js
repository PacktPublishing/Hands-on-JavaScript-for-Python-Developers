import React, { Component } from 'react'
import { Form, FormGroup, FormControl, Label } from "react-bootstrap/lib/"
import Panel from 'react-bootstrap/lib/Panel'
import axios from 'axios'

//This Component is a child Component of Customers Component
export default class CustomerDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  //Function which is called when the component loads for the first time
  componentDidMount() {
    this.getCustomerDetails(this.props.val)
  }

  //Function which is called whenver the component is updated
  componentDidUpdate(prevProps) {

    //get Customer Details only if props has changed
    if (this.props.val !== prevProps.val) {
      this.getCustomerDetails(this.props.val)
    }
  }

  //Function to Load the customerdetails data from json.
  getCustomerDetails(id) {
    axios.get('/api/get/' + id).then(response => {
      this.setState({ customerDetails: response })
    })
  };

  handleChange(event) {
    const details = this.state.customerDetails;
    details.data[event.target.name] = event.target.value;

    this.setState({ customerDetails: details });

    axios.post('/api/save/' + this.props.val, details)
      .then(() => {
        this.props.handler();
      });
  };

  render() {
    if (!this.state.customerDetails)
      return (<p>Loading Data</p>)
    return (<div className="customerdetails">
      <Panel bsStyle="info" className="centeralign">
        <Panel.Heading>
          <Panel.Title componentClass="h3">{this.state.customerDetails.data.name}</Panel.Title>
        </Panel.Heading>
        <Panel.Body>

          <Form>
            <FormGroup>
              <Label>Name:</Label>
              <FormControl name="name" type="text" placeholder="Enter name" value={this.state.customerDetails.data.name} onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <Label>Email:</Label>
              <FormControl name="email" type="email" placeholder="Enter email" value={this.state.customerDetails.data.email} onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <Label>Phone:</Label>
              <FormControl name="phone" type="number" placeholder="Enter phone" value={this.state.customerDetails.data.phone} onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <Label>City:</Label>
              <FormControl name="city" type="text" placeholder="Enter email" value={this.state.customerDetails.data.city} onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <Label>State:</Label>
              <FormControl name="state" type="text" placeholder="Enter email" value={this.state.customerDetails.data.state} onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <Label>Country:</Label>
              <FormControl name="country" type="test" placeholder="Enter email" value={this.state.customerDetails.data.country} onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <Label>Organization:</Label>
              <FormControl name="organization" type="test" placeholder="Enter email" value={this.state.customerDetails.data.organization} onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <Label>Job Profile:</Label>
              <FormControl name="jobProfile" type="test" placeholder="Enter email" value={this.state.customerDetails.data.jobProfile} onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <Label>Additional Info:</Label>
              <FormControl name="additionalInfo" type="test" placeholder="Enter email" value={this.state.customerDetails.data.additionalInfo} onChange={this.handleChange} />
            </FormGroup>

          </Form>
        </Panel.Body>
      </Panel>
    </div>)
  }
}
