import * as React from 'react'
import { Grid, Menu, MenuItem } from '@material-ui/core'
import Button from '@material-ui/core/Button'

// export interface SignedInMenu {
// }

interface IState {
  anchorEl: React.ReactNode | null
}

export default class SignedInMenu extends React.Component<{}, IState> {
  state: IState = {
    anchorEl: null,
  }

  handleClick = (event: React.MouseEvent): void => {
    this.setState({ anchorEl: event.target })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    let anchorEl = this.state.anchorEl
    return (
      <Grid container item justify='flex-end' alignItems='center' style={{ width: 'max-content' }}>
        <Button  aria-haspopup='true' onClick={this.handleClick}>
          Open Menu
        </Button>
        <Menu id='simple-menu' anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
          <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
          <MenuItem onClick={this.handleClose}>Logout</MenuItem>
        </Menu>
      </Grid>
    )
  }
}
