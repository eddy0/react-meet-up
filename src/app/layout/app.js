import React from 'react'
import EventDashboard from '../../feature/events/eventDashboard/EventDashboard'
import NavBar from '../../feature/nav/NavBar'
import { Container } from 'semantic-ui-react'

function App() {
  return (
    <>
        <NavBar/>
        <Container className={'main'}>
          <EventDashboard/>
        </Container>
    </>
  )
}


export default App
