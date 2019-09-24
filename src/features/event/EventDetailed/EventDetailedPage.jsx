import React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import EventDetailedHeader from './EventDetailedHeader'
import EventDetailedInfo from './EventDetailedInfo'
import EventDetailedChat from './EventDetailedChat'
import EventDetailedSidebar from './EventDetailedSidebar'

//simple component, no state methods allowed
//a constant with a function that returns jsx
//can pass in props from parent component

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {};

  if(eventId && state.events.length > 0){
    event = state.events.filter(event => event.id === eventId)[0]
  }

  return{
      event //when we map state, we map state to the props, we can use this even as out component props
  }
    
}

const EventDetailedPage = ({event}) => {
  return (

  <Grid>
    <Grid.Column width={10}>
      <EventDetailedHeader event={event}/>
      <EventDetailedInfo event={event}/>
      <EventDetailedChat/>
    </Grid.Column>
    <Grid.Column width={6}>
      <EventDetailedSidebar attendees={event.attendees}/>
    </Grid.Column>
  </Grid>

    
   
  )
}

export default connect(mapState)(EventDetailedPage)
