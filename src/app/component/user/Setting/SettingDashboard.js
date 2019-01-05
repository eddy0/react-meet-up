import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import { Redirect, Route, Switch } from 'react-router-dom'
import BasicPage from './BasicPage'
import SettingsNav from './SettingNav'
import AccountPage from './AccountPage'
import AboutPage from './AboutPage'
import PhotoPage from './PhotoPage'

class SettingDashboard extends Component {
  render() {
    return (
      <Grid>
        <Grid.Column width={12}>
          <Switch>
            <Redirect exact from='/setting' to='/setting/basic' />
            <Route exact path='/setting/basic' component={BasicPage} />
            <Route exact path='/setting/account' component={AccountPage} />
            <Route exact path='/setting/about' component={AboutPage} />
            <Route exact path='/setting/photos' component={PhotoPage} />
          </Switch>
        </Grid.Column>
        <Grid.Column width={4}>
          <SettingsNav/>
        </Grid.Column>
      </Grid>
    )
  }
}

export default SettingDashboard