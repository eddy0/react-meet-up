import * as React from 'react'
import { List, ListItem, ListItemIcon, ListItemText, ListSubheader, Divider, Card } from '@material-ui/core'
import InboxIcon from '@material-ui/icons/Inbox'
import { NavLink } from 'react-router-dom'

// export interface SettingNavProps {
// }

export default class SettingNav extends React.Component<{}, any> {
  render() {
    return (
      <Card style={{ maxWidth: 'max-content', margin: '0 auto' }}>
        <List subheader={<ListSubheader style={{ backgroundColor: '#333', color: '#fff', boxShadow: '0 3px 15px #000' }}>Profile</ListSubheader>}>
          <NavLink to='/settings/basic'>
          <ListItem button={true}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary='Basic' />
          </ListItem>
          </NavLink>
          <NavLink to='/settings/about'>
            <ListItem button={true}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary='About' />
            </ListItem>
          </NavLink>
          <NavLink to='/settings/photos'>
          <ListItem button={true}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary='Photos' />
          </ListItem>
          </NavLink>
        </List>
        <Divider />
        <List subheader={<ListSubheader style={{ backgroundColor: '#333', color: '#fff', boxShadow: '0 3px 15px #000' }}>Account</ListSubheader>}>
        <NavLink to='/settings/account'>
          <ListItem button={true}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary='Account' />
          </ListItem>
          </NavLink>
        </List>
      </Card>
    )
  }
}
