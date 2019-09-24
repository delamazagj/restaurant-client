import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect} from 'react-redux-firebase'
import { Grid, Form, Field, TextArea, Button, Input, Radio, Segment, Header} from 'semantic-ui-react'


const mapState = state => ({
  bills: state.firestore.ordered.ActiveBill,
  loading: state.async.loading
})

const actions = {
  //tryCoupon,
  //payBill
}

const payMembers = [
  {
    payment: 0,
    tip: 0
  },
  {
    payment: 0,
    tip: 0
  },
  {
    payment: 0,
    tip: 0
  },
  {
    payment: 0,
    tip: 0
  }
]

class PayForm extends Component {
  state = {}

handleChange = (e, { value }) => this.setState({ value })
handleChange2 = (e, { value2 }) => this.setState({ value2 })

filterTable = () => {

}

billTotal = () => {

}

handleCoupon = () =>{

}

handleSubmit = () =>{


}

  render() {
    const { bills } = this.props
    const { value, value2 } = this.state
    return (
      <div>
          <Grid>
            <Grid.Column width={10}>
              <Form>
                <Form.Field>
                  <label>Coupon</label>
                  <input placeholder='Please enter a code if you have one' />
                </Form.Field>
                <Form.Field color='green'control={Button}>Try Code</Form.Field>
              </Form>
              <Form>
              <Header>Cash or Credit?</Header> 
                <Form.Group>
                <Form.Field
                    control={Radio}
                    label='Cash'
                    value='cash'
                    checked={value === 'cash'}
                    onChange={this.handleChange}
                  />
                  <Form.Field
                    control={Radio}
                    label='Credit'
                    value='credit'
                    checked={value === 'credit'}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                { value === 'credit' && 
                    <Form.Input
                       label='Credit'
                       placeholder='Enter 16 digit Credit Card number'
                      />}
                 <Header>How would you like to split the check?</Header>    
                 <Form.Group>
                <Form.Field
                    control={Radio}
                    label='One Way'
                    value2={1}
                    checked={value2 === 1}
                    onChange={this.handleChange2}
                  />
                  <Form.Field
                    control={Radio}
                    label='Two Ways'
                    value2={2}
                    checked={value2 === 2}
                    onChange={this.handleChange2}
                  />
                  <Form.Field
                    control={Radio}
                    label='Three Ways'
                    value2={3}
                    checked={value2 === 3}
                    onChange={this.handleChange2}
                  />
                  <Form.Field
                    control={Radio}
                    label='Four Ways'
                    value2={4}
                    checked={value2 === 4}
                    onChange={this.handleChange2}
                  />
                </Form.Group>
                  { value2 === 1 && 
                    <div>
                    <Form.Input
                       label='Payment'
                       placeholder='Enter amount'
                      />
                      <Form.Input
                       label='Tip'
                       placeholder="Enter a tip, we won't judge if you don't"
                      />
                      </div>}

                  { value2 === 2 && 
                    <div>
                    <Form.Input
                       label='Payment'
                       placeholder='Enter amount'
                      />
                      <Form.Input
                       label='Tip'
                       placeholder="Enter a tip, we won't judge if you don't"
                      />
                      <Form.Input
                       label='Payment'
                       placeholder='Enter amount'
                      />
                      <Form.Input
                       label='Tip'
                       placeholder="Enter a tip, we won't judge if you don't"
                      />
                      </div>}

                  { value2 === 3 && 
                    <div>
                    <Form.Input
                       label='Payment'
                       placeholder='Enter amount'
                      />
                      <Form.Input
                       label='Tip'
                       placeholder="Enter a tip, we won't judge if you don't"
                      />
                      <Form.Input
                       label='Payment'
                       placeholder='Enter amount'
                      />
                      <Form.Input
                       label='Tip'
                       placeholder="Enter a tip, we won't judge if you don't"
                      />
                      <Form.Input
                       label='Payment'
                       placeholder='Enter amount'
                      />
                      <Form.Input
                       label='Tip'
                       placeholder="Enter a tip, we won't judge if you don't"
                      />
                      </div>}

                    { value2 === 4 && 
                    <div>
                    <Form.Input
                       label='Payment'
                       placeholder='Enter amount'
                      />
                      <Form.Input
                       label='Tip'
                       placeholder="Enter a tip, we won't judge if you don't"
                      />
                      <Form.Input
                       label='Payment'
                       placeholder='Enter amount'
                      />
                      <Form.Input
                       label='Tip'
                       placeholder="Enter a tip, we won't judge if you don't"
                      />
                    <Form.Input
                       label='Payment'
                       placeholder='Enter amount'
                      />
                      <Form.Input
                       label='Tip'
                       placeholder="Enter a tip, we won't judge if you don't"
                      />
                    <Form.Input
                       label='Payment'
                       placeholder='Enter amount'
                      />
                      <Form.Input
                       label='Tip'
                       placeholder="Enter a tip, we won't judge if you don't"
                      />
                      </div>}
                      <Form.Field color='green'control={Button}>Pay</Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column width={6}>
              Receipt
            </Grid.Column>
          </Grid>
      </div>
    )
  }
}

export default connect(mapState, actions)(firestoreConnect([{collection: 'ActiveBill'}])(PayForm));