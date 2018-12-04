import * as React from 'react'
import { TextField } from '@material-ui/core'
import { WrappedFieldProps } from 'redux-form'
import {  TextFieldProps } from '@material-ui/core/TextField'


type TextInputType = TextFieldProps & WrappedFieldProps

const TextInput: React.SFC<TextInputType> = (props) => {
  const {
  input,
  type,
  meta: {touched, error},
  ...rest
} = props
  return (
    <TextField
      type={type}
      error={touched && error}
      { ...input }
      { ...rest }
    />
  )
}


export default TextInput
