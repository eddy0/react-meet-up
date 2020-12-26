import React, { useState } from 'react'
import { Card, Grid, Header, Image, Tab } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection'
import { getUserEventsQuery } from '../../../app/firestore/fireStoreService'
import { listenToUserEvents } from '../profileActions'
import { format } from 'date-fns'

function EventTab({profile}) {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState(0)
  const {profileEvents} = useSelector(state => state.profile)
  const {loading} = useSelector(state => state.async)
  
  
  useFirestoreCollection({
    query: () => getUserEventsQuery(activeTab, profile.id),
    callback: events => dispatch(listenToUserEvents(events)),
    deps: [dispatch, activeTab],
  })
  
  const panes = [
    {menuItem: 'Future Events', pane: {key: 'future'}},
    {menuItem: 'Past Events', pane: {key: 'past'}},
    {menuItem: 'Hosting Events', pane: {key: 'hosting'}},
  ]
  
  return (
    <Tab.Pane  loading={loading}>
      
      <Grid>
        <Grid.Column width={16}>
          <Header floated={'left'} icon={'calendar'} content={`Events`}/>
        
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            onTabChange={(e, data) => setActiveTab(data.activeIndex)}
            panes={panes}
            menu={{secondary: true, pointing: true}}
           
          />
          <Card.Group itemsPerRow={5} style={{marginTop: 10}}>
            {
              profileEvents.map(event => {
                const formattedDate = format(event.date, 'MM dd yyyy')
                const formattedTime = format(event.date, 'hh:mm a')
                return (
                  <Card as={Link} to={`/events/${event.id}`} key={event.id}>
                    <Image src={`/assets/categoryImages/${event.category}.jpg`}
                           style={{minHeight: 100, objectFit: 'cover'}}/>
                    <Card.Content>
                      <Card.Header content={event.title} textAlign={'center'}/>
                      <Card.Meta textAlign={'center'}>
                        <div>{formattedDate}</div>
                        <div>{formattedTime}</div>
                      </Card.Meta>
                    </Card.Content>
                  </Card>
                )
              })
            }
          </Card.Group>
        
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  )
}

export default EventTab