import React from 'react'
import TextField from '@material-ui/core/TextField'

function TextArea(props) {
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



export default TextArea