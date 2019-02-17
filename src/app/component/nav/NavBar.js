import React, { Component } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import SignedInMenu from './SignedInMenu'
import SignedOutMenu from './SignedOutMenu'
import { Button, Container, Image, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { actionOpenModal } from '../../../action/modalAction'
import { actionLogout } from '../../../action/authAction'
import { withFirebase } from 'react-redux-firebase'
import { log } from '../../../utils/utils'

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
    this.props.firebase.logout()
    this.props.history.push('/')
  }

  render() {
    const {auth, profile} = this.props
    const authenticated = auth.isLoaded && !auth.isEmpty
    return (
      <Menu fixed='top' inverted borderless
            style={{background: 'lightcoral', boxShadow: '0 0.5rem 1rem rgba(0,0,0,0.3)', borderRadius: 0, zIndex: 999}}>
        <Container>
          <Menu.Item as={Link} to="/" header>
            <Image src="/assets/logo.png" alt="logo" size='mini'/>
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
              ? <SignedInMenu auth={auth} profile={profile} logout={this.handleLogout}/>
              : <SignedOutMenu login={this.handleLogin} register={this.handleRegister}/>
          }
        </Container>
      </Menu>
    )
  }
}


const mapState = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  }
}

const actions = {
  openModal: actionOpenModal,
  logout: actionLogout,
}

export default withRouter(withFirebase(connect(mapState, actions)(NavBar)))