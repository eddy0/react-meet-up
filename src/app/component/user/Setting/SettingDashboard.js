import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import { Redirect, Route, Switch } from 'react-router-dom'
import BasicPage from './BasicPage'
import SettingsNav from './SettingNav'
import AboutPage from './AboutPage'
import PhotoPage from './PhotoPage'
import AccountPage from './AccountPage'
import { connect } from 'react-redux'
import { updatePassword, updateProfile } from '../../../../action/authAction'


class SettingDashboard extends Component {
  render() {
    const {providerId, updatePassword, updateProfile, user} = this.props
    return (
      <Grid>
        <Grid.Column width={12}>
          <Switch>
            <Redirect exact from='/setting' to='/setting/basic' />
            <Route exact path='/setting/basic' render={() => <BasicPage initialValues={user} updateProfile={updateProfile} />} />
            <Route exact path='/setting/account' render={() => <AccountPage updatePassword={updatePassword} providerId={providerId}/>} />
            <Route exact path='/setting/about' render={() => <AboutPage updateProfile={updateProfile} initialValues={user}  />} />
            <Route exact path='/setting/photos' render={() => <PhotoPage />} />
          </Switch>
        </Grid.Column>
        <Grid.Column width={4}>
          <SettingsNav/>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  let providerId
  if (state.firebase.auth.isLoaded) {
    providerId = state.firebase.auth.providerData[0].providerId
  }
  return {
    providerId: providerId,
    user: state.firebase.profile
  }
}

const actions = {
  updatePassword: updatePassword,
  updateProfile: updateProfile,

}

export default connect(mapStateToProps, actions)(SettingDashboard)