import React, { Component } from "react";
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
//import moment from 'moment'
import { composeValidators, combineValidators, isRequired, hasLengthLessThan} from 'revalidate'
import cuid from 'cuid'
import { Segment, Form, Button, Grid, Header, Label } from "semantic-ui-react";
import { createEvent, updateEvent} from '../eventActions'
import TextInput from '../../../app/common/form/TextInput'
import TextArea from '../../../app/common/form/TextArea'
import SelectInput from '../../../app/common/form/SelectInput'
import { throws } from "assert";


const mapState = (state, ownProps) =>{
    const eventId = ownProps.match.params.id;

    let event = {} //redux-forms takes care of this now
    

    if(eventId && state.events.length > 0){
        event = state.events.filter(event => event.id === eventId)[0]
    }

    return {
        initialValues: event
    }
}

const actions = {
    createEvent,
    updateEvent
}

const category = [
    {key: '1', text: 'Just one check', value: 1},
    {key: '2', text: 'Two ways', value: 2},
    {key: '3', text: 'Three ways', value: 3},
    {key: '4', text: 'Four ways', value: 4}
];

const payOptions = [
    {key: '1', text: 'Cash', value: 'cash'},
    {key: '2', text: 'Credit', value: 'credit'}
];


const validate = combineValidators({
    title: isRequired({message: 'The event title is required'}),
    description: composeValidators(
        //isRequired({message: 'Please enter a description'}),
        hasLengthLessThan(255)({message: 'Must be less than 255 characters.'})
    )()
})

class EventForm extends Component {
  

    onFormSubmit = (values) => {
        
        //console.log(values)
        //console.log(this.state.event) //property from Component, accesses refs
        if(this.props.initialValues.id){ //check for id, if true then its an existing event
            this.props.updateEvent(values)
            this.props.history.goBack();
        }else{

            const newEvent = {
                ...values,
                id: cuid(),
                
            }
            this.props.createEvent(newEvent); //new event 
            this.props.history.push('/events')
        }
        
    }

  render() {
      const {invalid, submitting, pristine} = this.props;
    return (
        
        <Grid>
            <Grid.Column width={10}>
                <Segment>
                  <Header sub color='teal' content='Table 1: Checkout'/>
                    <Form>
                    <Field name='name' type='text' component={TextInput} placeholder='Enter a coupon code here if you have one'/>
                    <Header sub color='teal' content='Try a coupon!'/>
                    <Button disabled={invalid || submitting || pristine} positive type="submit">
                        Send
                    </Button>
                    </Form>
                    <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
                    <br/>
                    <Header sub color='teal' content='Give us your money'/>
                    <Field name='category' type='text' component={SelectInput} options={payOptions} placeholder='How Would you like to pay?'/>
                    <Field name='category' type='text' component={SelectInput} options={category} placeholder='Would you like to split the check?'/>
                    <Field name='description' type='text'  component={TextInput} placeholder='Enter Your Credit Card Number CONDITIONAL'/>
                    <Field name='description' type='text'  component={TextInput} placeholder='Enter Payment Amount DUPLICATE THIS AND TIPS BY SPLIT AMOUNT'/>
                    <Field name='description' type='text'  component={TextInput} placeholder="Enter a tip, we won't judge if you don't"/>
                    <Label>10%: 15%: 20%: </Label>
                    <Header sub color='teal' content='Pay when Ready'/>
                    <Button disabled={invalid || submitting || pristine} positive type="submit">
                        Pay
                    </Button>
                    <Button onClick={this.props.history.goBack} type="button">Cancel</Button>
                    </Form>
                 </Segment>
            </Grid.Column>
            <Grid.Column width={6}>
                <Segment><Header>Bill to Pay: </Header></Segment>
            </Grid.Column>
        </Grid>
        
      
    );
  }
}
export default connect(mapState, actions)(reduxForm({form: 'eventForm', enableReinitialize: true, validate})(EventForm));
