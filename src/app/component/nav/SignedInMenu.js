import React, { Component } from 'react'
import { Grid, MenuItem, Button, Menu, Typography } from '@material-ui/core'
import { Settings, PermContactCalendar, People, CalendarToday, PowerSettingsNew } from '@material-ui/icons'
import { Link } from 'react-router-dom'


const menus = [
  {name: 'Events', path: '/events', icon: <CalendarToday/>},
  {name: 'Profile', path: '/profile', icon: <People/>},
  {name: 'Account', path: '/account', icon: <PermContactCalendar/>},
  {name: 'Settings', path: '/settings', icon: <Settings/>},
  {name: 'Logout', path: '/', icon: <PowerSettingsNew/>},
]


const MenuComponent = ({menu, action}) => {
  if (menu.name === 'Logout') {
    return (
      <MenuItem onClick={action}>
        {menu.icon}
        <Typography variant='body1' color='inherit' style={{marginLeft: '5px'}}>
          {menu.name}
        </Typography>
      </MenuItem>
    )
  }
  return (
    <Link to={menu.path} style={{color: 'inherit'}}>
      <MenuItem onClick={action}>
        {menu.icon}
        <Typography variant='body1' color='inherit' style={{marginLeft: '5px'}}>
          {menu.name}
        </Typography>
      </MenuItem>
    </Link>
  )
}

class SignedInMenu extends Component {
  state = {
    anchorEl: null,
  }

  handleClick = (event) => {
    this.setState({anchorEl: event.target})
  }

  handleClose = () => {
    this.setState({anchorEl: null})
  }

  render() {
    let anchorEl = this.state.anchorEl
    return (
      <Grid container item justify='flex-end' alignItems='center' style={{width: 'max-content'}}>
        <Button color='inherit' aria-haspopup='true' onClick={this.handleClick}>
          username
        </Button>
        <Menu id='simple-menu' anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
          {menus &&
          menus.map((menu) => {
            return <MenuComponent key={menu.name} menu={menu}
                                  action={menu.name === 'Logout' ? this.props.logout : this.handleClose}/>
          })}
          {/* <MenuItem onClick={this.props.logout}>Logout</MenuItem> */}
        </Menu>
      </Grid>
    )
  }
}

export default SignedInMenu