import React, { Component } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import SignedInMenu from './SignedInMenu'
import SignedOutMenu from './SignedOutMenu'
import { Button, Container, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { actionOpenModal } from '../../../action/modalAction'

class NavBar extends Component {
  state = {
    login: false
  }

  handleLogin = () => {
    this.props.openModal('LoginModal')
  }

  handleRegister = () => {
    this.props.openModal('RegisterModal')
  }

  handleLogout = () => {
    this.setState({
      login: false
    })
    this.props.history.push('/')
  }

  render() {
    const {auth} = this.props
    const authenticated = auth.authentication
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={Link} to="/" header>
            <img src="/assets/logo.png" alt="logo"/>
            Re-vents
          </Menu.Item>
          <Menu.Item as={NavLink} to="/events" name="Events"/>
          {
            authenticated &&
            <Menu.Item as={NavLink} to="/people" name="People"/>
          }
          {
            authenticated &&
            <Menu.Item>
              <Button
                as={Link}
                to="/event/new"
                floated="right"
                positive
                inverted
                content="Create Event"
              />
            </Menu.Item>
          }
          {
            authenticated
              ? <SignedInMenu currentUser={auth.currentUser} logout={this.handleLogout}/>
              : <SignedOutMenu login={this.handleLogin} register={this.handleRegister}/>
          }
        </Container>
      </Menu>
    )
  }
}


const mapState = (state) => {
  return {
    auth: state.auth,
  }
}

const actions = {
  openModal: actionOpenModal,
}

export default withRouter(connect(mapState, actions)(NavBar))