import AppBar from '@material-ui/core/AppBar'
import Button from "@material-ui/core/Button/Button";
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import * as React from 'react';

interface IState {
  value: number,
}

export default class NavBar extends React.Component<{}, IState> {
  public state: IState = {
    value: 0,
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>, value: number) => {
    this.setState({
      value,
    })
  }

  public render() {
    return (
      <div>
        <AppBar position='fixed' color='primary'>
          <Toolbar disableGutters={true} style={{minHeight: 48}}>
            <img src="./assets/logo.png" alt="logo" style={{width: 50, height: 50, display: 'block'}} />
            <Typography variant='h6' color='inherit' gutterBottom={false} style={{marginLeft: '1rem'}}>
              Re-vents
            </Typography>
            <Tabs  style={{flex: 1}} value={this.state.value} onChange={this.handleChange}>
              <Tab label='Events' />
            </Tabs>
            <Button color="inherit">Login</Button>
            <Button color="inherit">Sign out</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
