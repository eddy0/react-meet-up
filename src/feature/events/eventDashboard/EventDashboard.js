import React, { useEffect, useState } from 'react'
import { Grid } from 'semantic-ui-react'
import EventList from './EventList'
import { useDispatch, useSelector } from 'react-redux'
import EventListItemPlaceholder from './EventListPlaceholder'
import EventFilters from './EventFilters'
import { dataFromSnapshot, getEventsFromFirestore } from '../../../app/firestore/fireStoreService'
import { listenToEvents } from '../eventActions'
import { asyncActionFinish, asyncActionStart } from '../../../app/async/asyncReducer'

function EventDashboard(props) {
  const dispatch = useDispatch()
  const {events} = useSelector(state => state.event)
  const {loading} = useSelector(state => state.async)
  
  useEffect(() => {
    dispatch(asyncActionStart())
    const unsubscribe = getEventsFromFirestore({
      next: snapshot => {
        dispatch(listenToEvents(snapshot.docs.map(doc => dataFromSnapshot(doc))))
        dispatch(asyncActionFinish())
      },
      error: error => console.log(error)
    })
    return unsubscribe
  }, [])
  
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