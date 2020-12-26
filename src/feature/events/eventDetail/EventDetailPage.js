import React from 'react'
import { Grid } from 'semantic-ui-react'
import EventDetailHeader from './EventDetailHeader'
import EventDetailInfo from './EventDetailInfo'
import EventDetailChat from './EventDetailChat'
import { useDispatch, useSelector } from 'react-redux'
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc'
import { listenToEventFromFirestore } from '../../../app/firestore/fireStoreService'
import { listenToEvents } from '../eventActions'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { Redirect } from 'react-router-dom'
import EventDetailSidebar from './EventDetailSidebar'

const EventDetailPage = ({match, history}) => {
  const dispatch = useDispatch()
  const event = useSelector(state => state.event.events.find(e => e.id === match.params.id))
  const {currentUser} = useSelector(state => state.auth)

  const {loading, error} = useSelector(state => state.async)
  const isHost = event && currentUser && event.hostUid === currentUser.uid
  const isGoing = event && currentUser && event.attendees.some(a => a.id === currentUser.uid)
  
  useFirestoreDoc({
    query: () => listenToEventFromFirestore(match.params.id),
    callback: (event) => dispatch(listenToEvents([event])),
    deps: [match.params.id, dispatch],
  })

  if (loading || (!event && !error) ) {
    return <LoadingComponent content={'loading event...'}/>
  }

  if (error) {
    return <Redirect to={'/error'}  />
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailHeader event={event} isGoing={isGoing} isHost={isHost}/>
        <EventDetailInfo event={event}/>
        <EventDetailChat eventId={event.id} parentId={event.id}/>
      </Grid.Column>

      <Grid.Column width={6}>
        <EventDetailSidebar event={event} />
      </Grid.Column>

    </Grid>
  )

}

export default EventDetailPage
