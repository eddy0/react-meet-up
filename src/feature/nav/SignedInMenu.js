import React from 'react'
import { Button, Dropdown, Image, Menu } from 'semantic-ui-react'
import { Link, useHistory } from 'react-router-dom'
import { signOutUser } from '../auth/authActions'
import { useDispatch, useSelector } from 'react-redux'

const SignedInMenu = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {currentUser} = useSelector(state => state.auth)
  const handleSignOut = () => {
    dispatch(signOutUser())
    history.push('/')
  }
  
  return (
    <>
      <Image avatar spaced={'right'} src={currentUser.photoURL ||'assets/user.png'}/>
      <Dropdown pointing={'top left'} text={currentUser.email}>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to={'/createEvent'} text={'create Event'} icon={'plus'}/>
          <Dropdown.Item as={Link} to={'/createEvent'} text={'profile'} icon={'user'}/>
          <Dropdown.Item text={'logout'} icon={'power'} onClick={handleSignOut}/>
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export default SignedInMenu