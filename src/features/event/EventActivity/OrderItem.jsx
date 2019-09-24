import React, { Component } from 'react'
import { Segment, Item, Button } from "semantic-ui-react";
import { connect } from 'react-redux'


const mapState = (state) => ({ //getting data from the store
  loading: state.test.loading
})

class OrderItem extends Component {
  render() {
    const { item, deleteItem } = this.props; //destructor, alternative to call an element
    //would be {this.props.event.someElement like hostPhotoURL}

    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              
              <Item.Content>
                          
                  <Item.Header as="a">{item.name}</Item.Header>
    
                <Item.Description>
                  <span clearing>${item.price}</span>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment clearing>
          <Button
            onClick={deleteItem(item.id)}
            as="a"
            color="red"
            floated="right"
            content="Remove Item"
          />
          
        </Segment>
      </Segment.Group>
    );
  }
}

export default connect(mapState)(OrderItem)