import React, { useState } from 'react'
import EventDashboard from '../../feature/events/eventDashboard/EventDashboard'
import NavBar from '../../feature/nav/NavBar'
import { Container } from 'semantic-ui-react'
import { Route } from 'react-router-dom'
import HomePage from '../../feature/home/HomePage'
import EventDetailPage from '../../feature/events/eventDetails/EventDetailPage'
import EventForm from '../../feature/events/eventForm/EventForm'

function App() {
  const [formOpen, setFormOpen] = useState(false)
  
  return (
    <>
      <Route exact={true} path={'/'} component={HomePage}/>
      <Route path={('/(.+)')} render={() => {
        return (
          <>
            <NavBar setFormOpen={setFormOpen}/>
            <Container className={'main'}>
              <Route exact={true} path={'/events'} component={EventDashboard}/>
              <Route exact={true} path={'/events/:id'} component={EventDetailPage}/>
              <Route exact={true} path={'/createEvent'} component={EventForm}/>
              {/*<EventDashboard formOpen={formOpen} setFormOpen={setFormOpen}/>*/}
            </Container>
          </>
        )
        
      }}/>
    
    </>
  )
}

export default App
