import React, { Component } from 'react'
import EventListItem from './EventListItem'


class EventList extends Component {
  render() {
    const events = this.props.events
    return (
      <div style={{paddingTop: 50}}>
          {
            events.map((event) => {
              return <EventListItem key={event.id} id={event.id} event={event}/>
            })
          }
      </div>
    )
  }
}

export default EventList