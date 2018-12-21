import React, { Component } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { AppBar, Grid, Typography, Button } from '@material-ui/core'
import styled from 'styled-components'
import SignedInMenu from './SignedInMenu'
import SignedOutMenu from './SignedOutMenu'

const Logo = styled.div`
  width: 55px;
  height: 55px;
  padding: 0 10px;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
`

const NavButton = styled(Button)`
  && {
    border-radius: 0;
  }
  &.active {
    background-color: #f4f4f4;
    color: #2bb9ad;
  }
`

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
      <AppBar color='primary' position='sticky'>
        <Grid container className='row'>
          {/* logo */}
          <Grid container item alignItems='center' style={{width: 'max-content'}}>
            <NavButton component={({innerRef, ...props}) => <Link {...props} to='/'/>} variant='text' color='secondary'>
              <Logo>
                <img src='/assets/logo.png' alt='logo'/>
              </Logo>
              <Typography color='inherit' variant='h6' style={{textTransform: 'uppercase'}}>
                Revent
              </Typography>
            </NavButton>
          </Grid>

          {/* navLink */}
          <Grid container item style={{flex: 1, marginLeft: '0.5rem'}}>
            <NavLink to='/events' activeClassName='active'>
              <NavButton variant='text' color='secondary'>
                Event
              </NavButton>
            </NavLink>

            <NavLink to='/create' activeStyle={{backgroundColor: '#f4f4f4', color: '#2BB9AD'}}>
              <NavButton variant='text' color='secondary'>
                Create Event
              </NavButton>
            </NavLink>
            <NavLink to='/people' activeStyle={{backgroundColor: '#f4f4f4', color: '#2BB9AD'}}>
              <NavButton variant='text' color='secondary'>
                People
              </NavButton>
            </NavLink>
          </Grid>
          {
            // login status
            this.state.login ? <SignedInMenu logout={this.handleLogout}/> : <SignedOutMenu login={this.handleLogin}/>
          }


        </Grid>
      </AppBar>
    )
  }
}

export default withRouter(NavBar)