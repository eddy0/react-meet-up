import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'

function NavBar(props) {
  return (
    <Menu inverted fixed={'top'}>
      <Container>
        <Menu.Item header>
          <img src="/assets/logo.png" alt="logo" style={{marginRight: 15}}/>
          Re-Vents
        </Menu.Item>
        <Menu.Item name={'Events'} />
        <Menu.Item>
          <Button positive={true} inverted={true} content={'Create Event'}  />
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
