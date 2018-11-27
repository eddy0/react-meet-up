import * as React from 'react'
import EventDashboard from './component/event/EventDashboard/EventDashboard'
import NavBar from './component/nav/NavBar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import createMuiTheme, { Theme } from '@material-ui/core/styles/createMuiTheme'
import { MuiThemeProvider } from '@material-ui/core'
import PeopleDashboard from './component/user/PeopleDashboard/PeopleDashboard'
import EventDetailedPage from './component/event/EventDetailed/EventDetailedPage'
import UserDetailedPage from './component/user/UserDetailed/UserDetailedPage'
import EventForm from './component/event/EventForm/EventForm'
import SettingsDashboard from './component/user/settings/SettingsDashboard'
import HomePage from './component/home/HomePage'
// import NotFound from './component/NotFound'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'
import middleware from './middleware'

const theme: Theme = createMuiTheme({
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

const store = createStore(reducers, middleware)

class App extends React.Component<any, any> {
  public render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <Router>
            <>
              <Switch>
                <Route exact={true} path='/' component={HomePage} />
                <Route
                  render={() => {
                    return (
                      <>
                        <NavBar />
                        <Switch>
                          <Route exact={true} path='/events' component={EventDashboard} />
                          <Route exact={true} path='/event/:id' component={EventDetailedPage} />
                          <Route exact={true} path='/people' component={PeopleDashboard} />
                          <Route exact={true} path='/profile/:id' component={UserDetailedPage} />
                          <Route path='/settings' component={SettingsDashboard} />
                          <Route exact={true} path='/create' component={EventForm} />
                          <Route exact={true} path='/create' component={EventForm} />
                          {/* <Route component={NotFound} /> */}
                        </Switch>
                      </>
                    )
                  }}
                />
              </Switch>
            </>
          </Router>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default App
