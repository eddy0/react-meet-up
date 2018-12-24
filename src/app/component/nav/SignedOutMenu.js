import React, { Component } from 'react'
import  Grid  from '@material-ui/core/Grid'
import  Button  from '@material-ui/core/Button'


export default class SignedOutMenu extends React.Component {
  render() {
    return (
      <Grid container item justify='flex-end' alignItems='center' style={{ width: 'max-content' }}>
        <Button variant='outlined' color='secondary' onClick={this.props.login}>
          login
        </Button>
        <Button variant='text' color='secondary' style={{ margin: '0 0.5rem' }}>
          sign up
        </Button>
      </Grid>
    )
  }
}