import React, {Component} from 'react'
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import reducer from '../../reducer'
import middleware from '../../middleware'
import NavBar from '../component/nav/NavBar'
import EventDashboard from '../component/event/EventDashboard/EventDashboard'
import NotFound from './NotFound'
import LoadingComponent from './LoadingComponent'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import EventForm from '../component/event/EventForm/EventForm'
import EventDetailedPage from '../component/event/EventDetailed/EventDetailedPage'
import SettingDashboard from '../component/user/Setting/SettingDashboard'
import PeopleDashboard from '../component/user/PeopleDashboard/PeopleDashboard'
import ModalHoc from '../component/common/modal/ModalHOC'
import TestComponent from './TestComponent'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import ReduxToastr from 'react-redux-toastr'


const store = createStore(reducer, middleware)


class App extends Component {

  componentDidMount() {

  }

  render() {
    return (
        <Provider store={store}>
          <Router>
            <>
              <LoadingComponent />
              <ModalHoc/>
              <ReduxToastr positon='bottom-right' transititonIn='fadeIn' transitionOut='fadeOut' />
              <NavBar />
              <div style={{paddingTop: 85}}>
              <Switch>
                <Redirect exact={true} from="/" to="/events" />
                <Route exact={true} path="/events" component={EventDashboard} />
                <Route exact={true} path="/event/new" component={EventForm} />
                <Route exact={true} path="/event/:id" component={EventDetailedPage} />
                <Route exact={true} path="/manage/:id" component={EventForm} />
                <Route exact={true} path="/profile/:id" component={PeopleDashboard} />
                <Route path="/setting" component={SettingDashboard} />
                <Route path="/test" component={TestComponent} />
                <Route component={NotFound} />
              </Switch>
              </div>
            </>
          </Router>
        </Provider>
    )
  }
}

export default App

