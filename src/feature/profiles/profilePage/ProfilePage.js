import React from 'react'
import { Grid } from 'semantic-ui-react'
import ProfileHeader from './ProfileHeader'
import ProfileContent from './ProfileContent'
import { useDispatch, useSelector } from 'react-redux'
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc'
import { getUserProfile } from '../../../app/firestore/fireStoreService'
import { listenToCurrentUserProfile, listenToSelectedUserProfile } from '../profileActions'
import LoadingComponent from '../../../app/layout/LoadingComponent'

function ProfilePage({match}) {
  const dispatch = useDispatch()
  const {selectedUserProfile} = useSelector(state => state.profile)
  const {currentUser} = useSelector(state => state.auth)
  const {loading, error} = useSelector(state => state.async)
  
  useFirestoreDoc({
    query: () => getUserProfile(match.params.id),
    callback: profile => {
      dispatch(listenToSelectedUserProfile(profile))
    },
    deps: [dispatch, match.params.id],
  })
  
  if ((loading && !selectedUserProfile) || (!selectedUserProfile && !error)) {
    return <LoadingComponent content={'loading profile...'}/>
  }
  
  const isCurrentUser = (currentUser.uid === selectedUserProfile.id)
  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader profile={selectedUserProfile} isCurrentUser={isCurrentUser}/>
        <h2>profile content</h2>
        <ProfileContent profile={selectedUserProfile} isCurrentUser={isCurrentUser}/>
      </Grid.Column>
    </Grid>
  )
}

export default ProfilePage