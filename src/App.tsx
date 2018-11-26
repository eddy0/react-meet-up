import * as React from 'react'
import EventDashboard from './component/event/EventDashboard/EventDashboard'
import NavBar from './component/NavBar/NavBar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import createMuiTheme, { Theme } from '@material-ui/core/styles/createMuiTheme'
import { MuiThemeProvider } from '@material-ui/core'
import PeopleDashboard from './component/user/PeopleDashboard/PeopleDashboard'
import EventDetailedPage from './component/event/EventDetailed/EventDetailedPage'
import UserDetailedPage from './component/user/UserDetailed/UserDetailedPage'
import EventForm from './component/event/EventForm/EventForm'
import SettingsDashboard from './component/user/settings/SettingsDashboard'
import HomePage from './component/home/HomePage'

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

class App extends React.Component<any, any> {
  public render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <>
            <NavBar />
            <Switch>
              <Route exact to='/' component={HomePage} />
              <Route  to='/events' component={EventDashboard} />
              <Route exact={true} to='/event/:id' component={EventDetailedPage} />
              <Route exact={true} to='/people' component={PeopleDashboard} />
              <Route exact={true} to='/profile/:id' component={UserDetailedPage} />
              <Route exact={true} to='/settings' component={SettingsDashboard} />
              <Route exact={true} to='/createEvent' component={EventForm} />
            </Switch>
          </>
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default App
