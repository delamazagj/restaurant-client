import React, { Component } from "react";
import EventListItem from "./EventListItem";

class EventList extends Component {
  render() {
    const { menu, deleteEvent, category, arr, special } = this.props;

    return (
      <div>
        {menu &&
          menu.map(
            item =>
              item.category === arr &&
              item.name !== "" && (
                <EventListItem
                  key={item.id}
                  item={item}
                  deleteEvent={deleteEvent}
                  special={special}
                />
              )
          )}
      </div>
    );
  }
}
export default EventList;
