import React from 'react'
import EventDashboard from '../../feature/events/eventDashboard/EventDashboard'
import NavBar from '../../feature/nav/NavBar'
import { Container } from 'semantic-ui-react'
import { Route } from 'react-router-dom'
import HomePage from '../../feature/home/HomePage'
import EventDetailPage from '../../feature/events/eventDetail/EventDetailPage'
import EventForm from '../../feature/events/eventForm/EventForm'

function App() {
  return (
    <>
      <Route exact={true} path={'/'} component={HomePage}/>
      <Route path={('/(.+)')} render={() => {
        return (
          <>
            <NavBar/>
            <Container className={'main'}>
              <Route exact={true} path={'/events'} component={EventDashboard}/>
              <Route exact={true} path={'/events/:id'} component={EventDetailPage}/>
              <Route exact={true} path={['/createEvent', '/manage/:id']} component={EventForm}/>
              {/*<EventDashboard formOpen={formOpen} setFormOpen={setFormOpen}/>*/}
            </Container>
          </>
        )
        
      }}/>
    
    </>
  )
}

export default App
