import * as React from 'react'
import { Grid, Menu, MenuItem } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { Settings, PermContactCalendar, People, CalendarToday, PowerSettingsNew } from '@material-ui/icons'
import Typography from '@material-ui/core/Typography'
// export interface SignedInMenu {
// }

type menu = {
  name: string
  path: string
  icon: React.ReactNode
}
// const menus: string[] = [{'name': 'Events', path: '/events', icon: 'ok'}, 'Profile': {}, 'Account': {}, 'Settings': {}, ]
const menus: menu[] = [
  { name: 'Events', path: '/events', icon: <CalendarToday /> },
  { name: 'Profile', path: '/profile', icon: <People /> },
  { name: 'Account', path: '/account', icon: <PermContactCalendar /> },
  { name: 'Settings', path: '/settings', icon: <Settings /> },
  { name: 'Logout', path: '/', icon: <PowerSettingsNew /> },
]

type MenuProps = {
  menu: menu
  action(): void
}

const MenuComponent: React.SFC<MenuProps> = ({ menu, action }: MenuProps) => {
  if (menu.name === 'Logout') {
    return (
      <MenuItem onClick={action}>
        {menu.icon}
        <Typography variant='body1' color='inherit' style={{ marginLeft: '5px' }}>
          {menu.name}
        </Typography>
      </MenuItem>
    )
  }
  return (
    <Link to={menu.path} style={{ color: 'inherit' }}>
      <MenuItem onClick={action}>
        {menu.icon}
        <Typography variant='body1' color='inherit' style={{ marginLeft: '5px' }}>
          {menu.name}
        </Typography>
      </MenuItem>
    </Link>
  )
}

interface IState {
  anchorEl?: HTMLButtonElement | null
}

interface Iprops {
  logout(): void
}

class SignedInMenu extends React.Component<Iprops, IState> {
  state: IState = {
    anchorEl: null,
  }

  handleClick = (event: React.MouseEvent): void => {
    this.setState({ anchorEl: event.target as HTMLButtonElement })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    let anchorEl = this.state.anchorEl
    return (
      <Grid container item justify='flex-end' alignItems='center' style={{ width: 'max-content' }}>
        <Button color='inherit' aria-haspopup='true' onClick={this.handleClick}>
          username
        </Button>
        <Menu id='simple-menu' anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
          {menus &&
            menus.map((menu: menu) => {
              return <MenuComponent key={menu.name} menu={menu} action={menu.name === 'Logout' ? this.props.logout : this.handleClose} />
            })}
          {/* <MenuItem onClick={this.props.logout}>Logout</MenuItem> */}
        </Menu>
      </Grid>
    )
  }
}

export default SignedInMenu
