import AppBar from '@material-ui/core/AppBar'
import Menu from '@material-ui/core/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

// export interface NavBarProps {
// }

export default class NavBar extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <AppBar position='fixed' >
          <Toolbar >
            <Typography variant='title'>
              this is the title
            </Typography>

            <img src='assets/logo.png' alt='logo' />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
