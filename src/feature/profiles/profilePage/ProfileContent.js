import React, {useState} from 'react'
import { Tab } from 'semantic-ui-react'
import AboutTab from './AboutTab'
import PhotosTab from './PhotosTab'
import EventTab from './EventTab'
import FollowingTab from "./FollowingTab";

function ProfileContent({profile, isCurrentUser}) {
  const [activeTab, setActiveTab] = useState(0)
  const panes = [
    {menuItem: 'About', render: () => <AboutTab profile={profile} isCurrentUser={isCurrentUser}/>},
    {menuItem: 'Photos', render: () => <PhotosTab profile={profile} isCurrentUser={isCurrentUser}/>},
    {menuItem: 'Events', render: () => <EventTab profile={profile} isCurrentUser={isCurrentUser}/>},
    {menuItem: 'Followers', render: () => <FollowingTab profile={profile} activeTab={activeTab} key={profile.id} /> },
    {menuItem: 'Following', render: () => <FollowingTab profile={profile} activeTab={activeTab} key={profile.id}/> },
  ]
  
  
  return (
    <Tab
      menu={{fluid: true, vertical: true}}
      menuPosition={'right'}
      panes={panes}
      onTabChange = {(e, data) => setActiveTab(data.activeIndex)}
    />
  )
}

export default ProfileContent