import React, { useState } from 'react'
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
import EventsFeed from "../eventDetail/EventsFeed";

function EventDashboard(props) {
  const dispatch = useDispatch()
  const {events} = useSelector(state => state.event)
  const {loading} = useSelector(state => state.async)
  const {authenticated} = useSelector(state => state.auth)
  const [predicate, setPredicate] = useState(new Map([
    ['startDate', new Date()],
    ['filter', 'all'],
    ]))
  
  const handleSetPredicate = (key, value) => {
    setPredicate(new Map(predicate.set(key, value)))
  }
  
  useFirestoreCollection({
    query: () => listenToEventsFromFirestore(predicate),
    callback: events => dispatch(listenToEvents(events)),
    deps: [dispatch, predicate],
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
        {
          authenticated &&
          <EventsFeed />
        }
        <EventFilters predicate={predicate} setPredicate={handleSetPredicate} loading={loading} />

      </Grid.Column>
    </Grid>
  )
}

export default EventDashboard