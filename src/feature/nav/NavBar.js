import React, { useState } from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'
import { NavLink, useHistory} from 'react-router-dom'
import SignedOutMenu from './SignedOutMenu'
import SignedInMenu from './SignedInMenu'

function NavBar() {
  const history = useHistory()
  const [authenticated, setAuthenticated] = useState(false)
  
  const handleSignOut = () => {
    setAuthenticated(false)
    history.push('/')
  }
  
  return (
    <Menu inverted fixed={'top'}>
      <Container>
        <Menu.Item header as={NavLink} exact={true} to={'/'}>
          <img src="/assets/logo.png" alt="logo" style={{marginRight: 15}}/>
          Re-Vents
        </Menu.Item>
        <Menu.Item name={'Events'} exact={true} as={NavLink} to={'/events'}/>
        {
          authenticated &&
          (
            <Menu.Item as={NavLink} to={'/createEvent'} exact={true}>
              <Button positive={true} inverted={true} content={'Create Event'} />
            </Menu.Item>
          )
        }
        <Menu.Item position={'right'}>
          {
            authenticated === false
              ? <SignedOutMenu setAuthenticated={setAuthenticated}/>
              : <SignedInMenu handleSignOut={handleSignOut}/>
          }
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default NavBar
