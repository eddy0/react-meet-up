import * as React from 'react'
import EventListeItem from "./EventListeItem";

// export interface EventListProps {

// }

class EventList extends React.Component<{}, any> {
  public render() {
    return (
      <div>
        <h4>Event List</h4>
        <EventListeItem/>
        <EventListeItem/>
        <EventListeItem/>



      </div>
    )
  }
}
export default EventList

