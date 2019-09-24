import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Header, Segment, Button, Form, Input, TextArea } from 'semantic-ui-react'
import OrderItem from './OrderItem'
import cuid from 'cuid'
import {  submitOrder, deleteEvent, addToBill } from '../eventActions'
import { firestoreConnect } from 'react-redux-firebase';

const mapState = (state) => ({ //getting data from the store
  loading: state.test.loading,
  activeBills: state.firestore.ordered.ActiveBill
})
 
const actions = {
  submitOrder,
  addToBill,
  deleteEvent
}
class EventActivity extends Component {
  constructor(){
    super()
    this.state = { notes: '' }
  }
  
  
  
  handleChange = (e, { name, value }) => {
    //console.log("Im called")
    this.setState({ [name]: value })
  }

  submitNewOrder = (items, bills) => {
        
   
    if(items.length > 0)
    {            
        this.props.submitOrder(items, this.state.notes); //new order
        this.props.addToBill(items, bills[0]);
        items.map((item) => (this.props.deleteEvent(item.id))) //delete current items after sent to firebase
    }
}

calcTotal = (bills) => {
  let total = bills[0].items.reduce((prev, cur) => prev + cur.price, 0);
  return total
}

  render () {
    const {deleteItem, events, activeBills} = this.props
    const {notes} = this.state

    
    return (
      <div>
        {activeBills && 
        <Segment><Header>Overall Total: ${this.calcTotal(activeBills)}</Header></Segment>}
        <div>
          <Form.Group >
          <Form.Input 
          control={TextArea} 
          placeholder='Tell us about any changes or allergies'
          name='notes'
          value={notes}
          onChange={this.handleChange}
           />
          </Form.Group>
        </div>
          
        {events &&
        events.map((item) => (
        
          <OrderItem key ={item.id} item={item}  deleteItem = {deleteItem}/>
        ))}

        
          <Button onClick={() => this.submitNewOrder(events, activeBills)} color="green" float="left" content="Submit Order"/>
      </div>
      
    )
  }
}

export default connect(mapState, actions)(firestoreConnect([{collection: 'ActiveBill'}])(EventActivity));
