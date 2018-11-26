import * as React from 'react'
import { Grid, Menu, MenuItem } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

// export interface SignedInMenu {
// }

const menus: string[] = ['Events', 'Profile', 'Account', 'Settings', ]

type MenuProps = {
  handleClose(): void
  menu: string
}

const MenuComponent: React.SFC<MenuProps> = (props: MenuProps) => {
  return (
    <MenuItem onClick={props.handleClose}>
      <Link to={`/${props.menu.toLocaleLowerCase()}`} style={{ color: 'inherit' }}>
        {props.menu}
      </Link>
    </MenuItem>
  )
}

interface IState {
  anchorEl?: HTMLButtonElement | null
}

interface Iprops {
  logout(): void
}

export default class SignedInMenu extends React.Component<Iprops, IState> {
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
            menus.map((menu) => {
              return <MenuComponent menu={menu} handleClose={this.handleClose} />
            })}
          <MenuItem onClick={this.props.logout}>
            Logout          
          </MenuItem>
        </Menu>
      </Grid>
    )
  }
}
