import React, { Component } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import NavBar from '../component/nav/NavBar'
import EventDashboard from '../component/event/EventDashboard/EventDashboard'
import NotFound from './NotFound'
import LoadingComponent from './LoadingComponent'
import EventForm from '../component/event/EventForm/EventForm'
import EventDetailedPage from '../component/event/EventDetailed/EventDetailedPage'
import SettingDashboard from '../component/user/Setting/SettingDashboard'
import ModalHoc from '../component/common/modal/ModalHOC'
import TestComponent from './TestComponent'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import ReduxToastr from 'react-redux-toastr'
import UserDetailedPage from '../component/user/UserDetailed/UserDetailedPage'
import PeopleDashboard from '../component/user/PeopleDashboard/PeopleDashboard'


class App extends Component {
  render() {
    return (
      <Router>
        <>
          <ReduxToastr position='bottom-right' progressBar={true}/>
          <LoadingComponent/>
          <ModalHoc/>
          <NavBar/>
          <div style={{paddingTop: 85}}>
            <Switch>
              <Redirect exact={true} from="/" to="/events"/>
              <Route exact={true} path="/events" component={EventDashboard}/>
              <Route exact={true} path="/event/new" component={EventForm}/>
              <Route exact={true} path="/event/:id" component={EventDetailedPage}/>
              <Route exact={true} path="/manage/:id" component={EventForm}/>
              <Route exact={true} path="/profile/:id" component={UserDetailedPage}/>
              <Route exact={true} path="/people" component={PeopleDashboard}/>
              <Route path="/setting" component={SettingDashboard}/>
              <Route path="/test" component={TestComponent}/>
              <Route component={NotFound}/>
            </Switch>
          </div>
        </>
      </Router>
    )
  }
}

export default App

