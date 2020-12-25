import React from 'react'
import { Grid } from 'semantic-ui-react'
import ProfileHeader from './ProfileHeader'

function ProfilePage(props) {
  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader />
        <h2>profile content</h2>
      </Grid.Column>
    </Grid>
  )
}

export default ProfilePage