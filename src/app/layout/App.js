import React, { Component } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import NavBar from '../component/nav/NavBar'
import EventDashboard from '../component/event/EventDashboard/EventDashboard'
import NotFound from './NotFound'
import LoadingComponent from './LoadingComponent'
import { createStore } from 'redux'
import reducer from '../reducer'
import middleware from '../middleware'
import { Provider } from 'react-redux'
import EventForm from '../component/event/EventForm/EventForm'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core'

const store = createStore(reducer, middleware)

const Theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#6b9aaf',
    },
    secondary: {
      main: '#e6f8fb',
    },
  },
})

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={Theme}>
        <Provider store={store}>
          <Router>
            <>
              <LoadingComponent loading={false}/>
              <NavBar/>
              <Switch>
                <Redirect exact={true} from='/' to='/events'/>
                <Route exact={true} path='/events' component={EventDashboard}/>
                <Route exact={true} path='/create' component={EventForm}/>
                <Route component={NotFound}/>
              </Switch>
            </>
          </Router>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default App
