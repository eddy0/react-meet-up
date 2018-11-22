import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { withRouter, NavLink } from 'react-router-dom'

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

class NavBar extends React.Component {
  render() {
    return (
      <AppBar color='primary' position='sticky'>
        <Grid container className='row'>
          {/* logo */}
          <Grid container item alignItems='center' style={{ width: 'max-content' }}>
            <Logo>
              <img src='./assets/logo.png' alt='logo' />
            </Logo>
            <Typography color='inherit' variant='h6' style={{ textTransform: 'uppercase' }}>
              Revent
            </Typography>
          </Grid>

          {/* navLink */}
          <Grid container item style={{ flex: 1, marginLeft: '0.5rem' }}>
            <NavButton component={<NavLink to='/' /> }  activeClassName='active' variant='text' color='secondary'>
              Event
            </NavButton>
            <NavButton component={NavLink} to='/create' activeStyle={{ backgroundColor: '#f4f4f4', color: '#2BB9AD' }} variant='text' color='secondary'>
              Create Event
            </NavButton>
          </Grid>

          {/* login status */}
          <Grid container item justify='flex-end' alignItems='center' style={{ width: 'max-content' }}>
            <Button variant='outlined' color='secondary'>
              login
            </Button>
            <Button variant='text' color='secondary' style={{ margin: '0 0.5rem' }}>
              logout
            </Button>
          </Grid>
        </Grid>
      </AppBar>
    )
  }
}

export default withRouter(NavBar)
