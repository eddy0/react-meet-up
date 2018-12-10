import * as React from 'react'
import { TextField } from '@material-ui/core'
import { IFormProps } from './types'


const SelectInput  = (props:IFormProps ) => {
  const {
    children,
    input,
    meta: {touched, error},
    ...rest
  } = props
  return (
    <TextField
      select={ true }
      error={ touched && error }
      children={ children }
      margin="normal"
      { ...input }
      { ...rest }
    />
  )
}

export default SelectInput
