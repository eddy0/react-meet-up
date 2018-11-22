import React, { Component } from 'react'
import FormControl from '@material-ui/core/FormControl'
import { InputLabel, Input, InputAdornment } from '@material-ui/core'
import {Face} from '@material-ui/icons'
export default class EventForm extends Component {
  render() {
    return (
      <div>
        <FormControl>
          <InputLabel htmlFor='name'>name</InputLabel>
          <Input
            id='name'
            name='username'
            // startAdornment={ <InputAdornment position='start'><Face /></InputAdornment>}
          />
        </FormControl>
      </div>
    )
  }
}
