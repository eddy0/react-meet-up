import React, { Component } from 'react'
import { Button, Menu } from 'semantic-ui-react'


export default class SignedOutMenu extends React.Component {
  render() {
    return (
      <Menu.Item position='right'>
        <Button basic inverted content='login' onClick={this.props.login} />
        <Button basic inverted content='Sign up' style={{marginLeft: '0.5rem'}} />
      </Menu.Item>
    )
  }
}