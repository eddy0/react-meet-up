import { IconButton, Tab, Tabs, } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar'
// import Menu from '@material-ui/core/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

// export interface NavBarProps {
// }

interface IMenuState {
  value: number,
}

export default class NavBar extends React.Component<{}, IMenuState> {
  state: IMenuState = {
    value: 0
  }

  handleMenuChange = (e: React.FormEvent<HTMLInputElement>, value: number) => {
    this.setState({
      value,
    })
  }

  render() {
    const val: number = this.state.value
    return (
      <div>
        <AppBar position='fixed' color="secondary">
          <Toolbar >
            <Typography variant='title' color="inherit">
              this is the title
            </Typography>
            <Tabs value={val} onChange={this.handleMenuChange} style={{ flex: 1 }} >
              <Tab label='item1' />
              <Tab label='item2' />
              <Tab label='item3' />
            </Tabs>
            <div>
              <IconButton>button</IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
