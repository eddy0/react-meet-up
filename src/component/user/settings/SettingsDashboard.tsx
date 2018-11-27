import * as React from 'react'
import SettingNav from './SettingsNav'
import { Grid, Typography } from '@material-ui/core'
import { Route, Switch, Redirect } from 'react-router-dom'
import AboutPage from './AboutPage'
import AccountPage from './AccountPage'
import PhotoPage from './PhotosPage'
import BasicPage from './BasicPage'

// export interface SettingsDashboard
// }

export default class SettingsDashboard extends React.Component<any, any> {
  public render() {
    return (
      <div className='row'>
        SettingsDashboard
        <Grid container xs={12}>
          <Grid item xs={6} style={{ textAlign: 'center' }}>
            <Typography variant='h5'>good</Typography>
            <Switch>
              <Redirect exact={true} from='/settings' to='/settings/basic' />
              <Route path='/settings/basic' component={BasicPage} />
              <Route path='/settings/about' component={AboutPage} />
              <Route path='/settings/photos' component={PhotoPage} />
              <Route path='/settings/account' component={AccountPage} />
            </Switch>
          </Grid>
          <Grid item xs={6} style={{ textAlign: 'center' }}>
            <SettingNav />
          </Grid>
        </Grid>
      </div>
    )
  }
}
