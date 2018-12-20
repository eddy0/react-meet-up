import React from 'react'

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