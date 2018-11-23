import * as React from 'react'
import EventDashboard from './component/event/EventDashboard/EventDashboard'
import NavBar from './component/NavBar/NavBar'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import createMuiTheme, {  Theme } from '@material-ui/core/styles/createMuiTheme'
import { MuiThemeProvider } from '@material-ui/core'

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
            <Route to='/' component={EventDashboard} />
          </>
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default App
