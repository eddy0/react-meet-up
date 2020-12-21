import React  from 'react'
import { Grid } from 'semantic-ui-react'
import EventList from './EventList'
import { useDispatch, useSelector } from 'react-redux'
import EventListItemPlaceholder from './EventListPlaceholder'
import EventFilters from './EventFilters'
import {
  listenToEventsFromFirestore
} from '../../../app/firestore/fireStoreService'
import { listenToEvents } from '../eventActions'
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection'

function EventDashboard(props) {
  const dispatch = useDispatch()
  const {events} = useSelector(state => state.event)
  const {loading} = useSelector(state => state.async)
  
  useFirestoreCollection({
    query: () => listenToEventsFromFirestore(),
    callback: events => dispatch(listenToEvents(events)),
    deps: [dispatch],
  })

  
  return (
    <Grid>
      <Grid.Column width={10}>
        {
          loading &&
          <>
            <EventListItemPlaceholder/>
            <EventListItemPlaceholder/>
          </>
        }
        <EventList events={events}/>
      </Grid.Column>
      <Grid.Column width={6}>
        <EventFilters />
      </Grid.Column>
    </Grid>
  )
}

export default EventDashboard