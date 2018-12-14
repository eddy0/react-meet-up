import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from '../component/nav/NavBar'
import EventDashboard from '../component/event/EventDashboard/EventDashboard'
import NotFound from './NotFound'
import Eventform from '../component/event/EventForm/Eventform'

class App extends Component {
  render() {
    return (
      <Router>
        <>
          <NavBar/>
          <Switch>
            <Route exact={true} to='/' component={Eventform}/>
            <Route component={NotFound}/>
          </Switch>
        </>
      </Router>
    )
  }
}

export default App
