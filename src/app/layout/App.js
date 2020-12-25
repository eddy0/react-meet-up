import React from 'react'
import EventDashboard from '../../feature/events/eventDashboard/EventDashboard'
import NavBar from '../../feature/nav/NavBar'
import { Container } from 'semantic-ui-react'
import { Route, useLocation } from 'react-router-dom'
import HomePage from '../../feature/home/HomePage'
import EventDetailPage from '../../feature/events/eventDetail/EventDetailPage'
import EventForm from '../../feature/events/eventForm/EventForm'
import ModalManager from '../../common/modals/ModalManager'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';
import ErrorComponent from '../../common/errors/ErrorComponent'
import AccountPage from '../../feature/auth/AccountPage'
import { useSelector } from 'react-redux'
import LoadingComponent from './LoadingComponent'
import ProfilePage from '../../feature/profiles/profilePage/ProfilePage'

function App() {
  const {key} = useLocation()
  const {initialized} = useSelector(state => state.async)

  if (!initialized) {
    return <LoadingComponent content={'loading..'} />
  }
  return (
    <>
      <Route exact={true} path={'/'} component={HomePage}/>
      <Route path={('/(.+)')} render={() => {
        return (
          <>
            <ToastContainer position={'bottom-right'} />
            <ModalManager />
            <NavBar/>
            <Container className={'main'}>
              <Route exact={true} path={'/events'} component={EventDashboard}/>
              <Route exact={true} path={'/events/:id'} component={EventDetailPage}/>
              <Route exact={true} path={['/createEvent', '/manage/:id']} component={EventForm} key={key}/>
              <Route exact={true} path={'/error'} component={ErrorComponent} />
              <Route exact={true} path={'/profile/:id'} component={ProfilePage} />
              <Route exact={true} path={'/account'} component={AccountPage} />
              {/*<EventDashboard formOpen={formOpen} setFormOpen={setFormOpen}/>*/}
            </Container>
          </>
        )
        
      }}/>
    
    </>
  )
}

export default App
