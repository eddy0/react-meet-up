import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

function NavBar({setFormOpen}) {
  return (
    <Menu inverted fixed={'top'}>
      <Container>
        <Menu.Item header as={NavLink} exact={true}  to={'/'}>
          <img src="/assets/logo.png" alt="logo" style={{marginRight: 15}}/>
          Re-Vents
        </Menu.Item>
        <Menu.Item name={'Events'} exact={true} as={NavLink} to={'/events'}/>
        <Menu.Item as={NavLink} to={'/createEvent'} exact={true}>
          <Button positive={true} inverted={true} content={'Create Event'}  onClick={() => setFormOpen(true)} />
        </Menu.Item>
        <Menu.Item position={'right'}>
          <Button basic={true} inverted={true} content={'Login'}  />
          <Button basic={true} inverted={true} content={'Logout'}  style={{marginLeft: '0.5em'}} />
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default NavBar
