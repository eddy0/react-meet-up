import React from 'react'
import { Tab } from 'semantic-ui-react'
import AboutTab from './AboutTab'

function ProfileContent({profile, isCurrentUser}) {
  const panes = [
    {menuItem: 'About', render: () => <AboutTab profile={profile} isCurrentUser={isCurrentUser}/>},
    {menuItem: 'Photos', render: () => <Tab.Pane> About Photos</Tab.Pane>},
    {menuItem: 'Followers', render: () => <Tab.Pane> About Followers</Tab.Pane>},
    {menuItem: 'Following', render: () => <Tab.Pane> About Following</Tab.Pane>},
  ]
  
  
  return (
    <Tab
      menu={{fluid: true, vertical: true}}
      menuPosition={'right'}
      panes={panes}
    />
  )
}

export default ProfileContent