import React from 'react'
import TextField from '@material-ui/core/TextField'

function TextInput(props) {
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
      {...input}
      {...rest}
    />
  )
}



export default TextInput