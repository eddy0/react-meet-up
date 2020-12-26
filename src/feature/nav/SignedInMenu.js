import React from 'react'
import { Dropdown, Image } from 'semantic-ui-react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { signOutFirebase } from '../../app/firestore/firebaseService'
import { toast } from 'react-toastify'

const SignedInMenu = () => {
  const history = useHistory()
  const {currentUserProfile} = useSelector(state => state.profile)
  
  const handleSignOut = async () => {
    try {
      await signOutFirebase()
      history.push('/')
    } catch (error) {
      toast.error(error.message)
    }
  }
  if (currentUserProfile === null) {
    return <span />
  }
  
  const {photoURL, displayName, id}= currentUserProfile
  
  return (
    <>
      <Image avatar spaced={'right'} src={photoURL || '/assets/user.png'}/>
      <Dropdown pointing={'top left'} text={displayName}>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to={'/createEvent'} text={'create Event'} icon={'plus'}/>
          <Dropdown.Item as={Link} to={`/profile/${id}`} text={'profile'} icon={'user'}/>
          <Dropdown.Item as={Link} to={'/account'} text={'account'} icon={'settings'}/>
          <Dropdown.Item text={'logout'} icon={'power'} onClick={handleSignOut}/>
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export default SignedInMenu