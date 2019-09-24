import React, { Component } from "react";
import { Segment, Item, Button, Popup } from "semantic-ui-react";
import { connect } from "react-redux";
import cuid from "cuid";
import { createEvent } from "../eventActions";

const mapState = state => ({
  //getting data from the store
  loading: state.test.loading
});

const actions = {
  createEvent
};

class EventListItem extends Component {
  addToCart = (name, price, category) => {
    //console.log(values)
    //console.log(this.state.event) //property from Component, accesses refs

    const newEvent = {
      name: name,
      price: price,
      id: cuid(),
      category: category
    };
    this.props.createEvent(newEvent); //new event
  };

  render() {
    const { item, special } = this.props; //destructor, alternative to call an element
    //would be {this.props.event.someElement like hostPhotoURL}
    //const ch = () => this.changeSpecial();

    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image
                size="tiny"
                circular
                src={item.image}
                data-content={item.calories}
              />
              <Item.Content>
                <Popup
                  key={item.name}
                  trigger={<Item.Header as="a">{item.name}</Item.Header>}
                  header="Calories"
                  content={item.calories}
                />
                <Item.Description>
                  <span clearing>${item.price}</span>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment clearing>
          <span>{item.description}</span>
          <Button
            onClick={() => this.addToCart(item.name, item.price, item.category)}
            color="green"
            floated="right"
            content="Add to Order"
          />
        </Segment>
      </Segment.Group>
    );
  }
}
export default connect(
  mapState,
  actions
)(EventListItem);
