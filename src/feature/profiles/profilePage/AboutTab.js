import React, { useState } from 'react'
import { Button, Grid, Header, Tab } from 'semantic-ui-react'
import { format } from 'date-fns'
import ProfileForm from './ProfileForm'

function AboutTab({profile, isCurrentUser}) {
  const [editMode, setEditMode] = useState(false)
  
  const formattedDate = format(profile.createdAt, 'MM dd yyyy')
  return (
    <Tab.Pane>
      
      <Grid>
        <Grid.Column width={16}>
          <Header floated={'left'} icon={'user'} content={`About ${profile.displayName}`}/>
          {
            isCurrentUser &&
            <Button onClick={() => setEditMode(!editMode)} floated={'right'} basic
                    content={editMode ? 'Cancel' : 'Edit'}/>
          }
        </Grid.Column>
        <Grid.Column width={16}>
          {
            editMode
              ? (
                <ProfileForm profile={profile}/>
              
              )
              : (
                <>
                  <div style={{marginBottom: 10}}>
                    <strong>Member since: {formattedDate}</strong>
                    <div>
                      {profile.description || null}
                    </div>
                  </div>
                </>
              )
          }
        
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  )
}

export default AboutTab