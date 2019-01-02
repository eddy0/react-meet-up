import React, { Component } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import SignedInMenu from './SignedInMenu'
import SignedOutMenu from './SignedOutMenu'
import { Button, Container, Menu } from 'semantic-ui-react'

class NavBar extends Component {
  state = {
    login: false
  }

  handleLogin = () => {
    this.setState({
      login: true
    })
  }

  handleLogout = () => {
    this.setState({
      login: false
    })
    this.props.history.push('/')
  }

  render() {
    return (
     <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={Link} to="/" header>
            <img src="/assets/logo.png" alt="logo" />
            Re-vents
          </Menu.Item>
          <Menu.Item as={NavLink} to="/events" name="Events" />
          <Menu.Item as={NavLink} to="/people" name="People" />
          <Menu.Item>
            <Button
              as={Link}
              to="/createEvent"
              floated="right"
              positive
              inverted
              content="Create Event"
            />
          </Menu.Item>
          {
            this.state.login
              ? <SignedInMenu  logout={this.handleLogout} />
              : <SignedOutMenu login={this.handleLogin} />
          }
        </Container>
      </Menu>
    )
  }
}

export default withRouter(NavBar)