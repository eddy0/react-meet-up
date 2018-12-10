import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import styled  from 'styled-components'
import Typography from '@material-ui/core/Typography'
import Button, { ButtonProps } from '@material-ui/core/Button'
import {  NavLink, Link, withRouter, RouteComponentProps  } from 'react-router-dom'
import SignedOutMenu from './SignedOutMenu';
import  SignedInMenu from './SignedInMenu';

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


const NavButton = styled(Button as React.ComponentType<ButtonProps>)`
  && {
    border-radius: 0;
  }
  &.active {
    background-color: #f4f4f4;
    color: #2bb9ad;
  }  
` as React.SFC<ButtonProps>

interface IState {
  login: boolean
  
}

class NavBar extends React.Component<RouteComponentProps<{}> & {}, IState>  {
  state:IState={
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
          <Grid container item alignItems='center' style={{ width: 'max-content' }}>
            <Link to='/'>
          <NavButton  variant='text' color='secondary'>
            <Logo>
              <img src='/assets/logo.png' alt='logo' />
            </Logo>
            <Typography color='inherit' variant='h6' style={{ textTransform: 'uppercase' }}>
              Revent
            </Typography>
            </NavButton>
            </Link>
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
          {
            this.state.login?  <SignedInMenu logout={this.handleLogout} /> : <SignedOutMenu login={this.handleLogin} />
          }
        </Grid>
      </AppBar>
    )
  }
}

export default withRouter(NavBar)
