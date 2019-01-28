import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Image, Menu } from 'semantic-ui-react'


class SignedInMenu extends Component {
  state = {}

  render() {
    const {logout, auth, profile} = this.props
    return (
      <Menu.Item position="right">
        <Image avatar spaced="right" src={auth.photoURL || '/assets/user.png'}/>
        <Dropdown pointing="top left" text={auth.displayName}>
          <Dropdown.Menu>
            <Dropdown.Item text="Create Event" icon="plus"/>
            <Dropdown.Item text="My Events" icon="calendar"/>
            <Dropdown.Item text="My Network" icon="users"/>
            <Dropdown.Item as={Link} to={`/profile/${auth.uid }`} text="My Profile" icon="user"/>
            <Dropdown.Item as={Link} to='/setting' text="Setting" icon="settings"/>
            <Dropdown.Item onClick={logout} text="Sign Out" icon="power"/>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    )
  }
}

export default SignedInMenu