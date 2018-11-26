import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import Button, { ButtonProps } from '@material-ui/core/Button'
import {  NavLink, Link  } from 'react-router-dom'
import SignedOutMenu from './SignedOutMenu';

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

const NavButton:React.SFC<ButtonProps> = styled(Button)`
  && {
    border-radius: 0;
  }
  &.active {
    background-color: #f4f4f4;
    color: #2bb9ad;
  }
`

class NavBar extends React.Component<any, any>  {
  render() {
    return (
      <AppBar color='primary' position='sticky'>
        <Grid container className='row'>
          {/* logo */}
          <Grid container item alignItems='center' style={{ width: 'max-content' }}>
          <NavButton  component={ ({innerRef, ...props}) => <Link {...props} to='/'  /> } variant='text' color='secondary'>
            <Logo>
              <img src='./assets/logo.png' alt='logo' />
            </Logo>
            <Typography color='inherit' variant='h6' style={{ textTransform: 'uppercase' }}>
              Revent
            </Typography>
            </NavButton>
          </Grid>

          {/* navLink */}
          <Grid container item style={{ flex: 1, marginLeft: '0.5rem' }}>
            <NavButton component={({innerRef, ...props}) => <NavLink to= '/events' activeClassName='active' {...props} />}   variant='text' color='secondary'>
              Event
            </NavButton>
            <NavButton  component={ ({innerRef, ...props}) => <NavLink {...props} to='/create'  activeStyle={{ backgroundColor: '#f4f4f4', color: '#2BB9AD' }}  /> } variant='text' color='secondary'>
              Create Event
            </NavButton>
            <NavButton  component={ ({innerRef, ...props}) => <NavLink {...props} to='/people'  activeStyle={{ backgroundColor: '#f4f4f4', color: '#2BB9AD' }}  /> } variant='text' color='secondary'>
            People
            </NavButton>
          </Grid>

          {/* login status */}
          <SignedOutMenu />
          
        </Grid>
      </AppBar>
    )
  }
}

export default (NavBar)
