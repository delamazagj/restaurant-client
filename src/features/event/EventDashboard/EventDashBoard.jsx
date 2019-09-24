import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { reduxForm, Field } from "redux-form";
import { Grid, Segment, Form, Button, Item, Popup } from "semantic-ui-react";
import EventList from "../EventList/EventList";
import { deleteEvent, loadMenu } from "../eventActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { combineValidators, hasLengthLessThan } from "revalidate";
import EventActivity from "../EventActivity/EventActivity";
import EventForm from "../EventForm/EventForm";
import TextArea from "../../../app/common/form/TextArea";
import { stat } from "fs";

const mapState = state => ({
  events: state.events,
  menu: state.firestore.ordered.menu,
  loading: state.async.loading
});

const actions = {
  deleteEvent
};

const validate = hasLengthLessThan(255)({
  message: "Must be less than 255 characters."
});

class EventDashBoard extends Component {
  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId);
    /*const updatedEvents = this.state.events.filter(e => e.id !== eventId); //creates new array of events that dont match event id
    this.setState({
        events: updatedEvents
    })*/
  };

  filterCategory = cat => {
    let selected = this.props.menu.filter(table => {
      return table.category === cat;
    });
    return selected;
    console.log(selected);
  };

  /*handleSpecial = () => {
    this.setState({ show: true });
    console.log(this.state);
  };*/

  render() {
    //const {selectedEvent} = this.state;
    const { menu, loading, events } = this.props;

    //console.log(events)
    const tempTotal = events.reduce((prev, cur) => prev + cur.price, 0);

    if (loading) return <LoadingComponent inverted={true} />;

    return (
      <div>
        <Grid>
          <Grid.Column width={9}>
            <h2>Appetizer</h2>
            <EventList
              deleteEvent={this.handleDeleteEvent}
              menu={menu}
              arr="Appetizer"
              special={this.handleSpecial}
            />
            <h2>Entree</h2>
            <EventList
              deleteEvent={this.handleDeleteEvent}
              menu={menu}
              arr="Entree"
              special={this.handleSpecial}
            />
            <h2>Kid's Meals</h2>
            <EventList
              deleteEvent={this.handleDeleteEvent}
              menu={menu}
              arr="Kid's Meals"
              special={this.handleSpecial}
            />
            <h2>Dessert</h2>
            <EventList
              deleteEvent={this.handleDeleteEvent}
              menu={menu}
              arr="Dessert"
              special={this.handleSpecial}
            />
            <h2>Drinks</h2>
            <EventList
              deleteEvent={this.handleDeleteEvent}
              menu={menu}
              arr="Drinks"
              special={this.handleSpecial}
            />

            <h2>Special of the Day</h2>
            <EventList
              deleteEvent={this.handleDeleteEvent}
              menu={menu}
              arr="Special"
              special={this.handleSpecial}
            />
          </Grid.Column>
          <Grid.Column width={7}>
            <Segment header>Current Order Total: ${tempTotal}</Segment>
            <EventActivity
              events={events}
              deleteItem={this.handleDeleteEvent}
            />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(firestoreConnect([{ collection: "menu" }])(EventDashBoard));
