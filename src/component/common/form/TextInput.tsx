import * as React from 'react'
import { TextField } from '@material-ui/core'
import { IFormProps } from './types'


const TextInput: React.SFC<IFormProps> = (props) => {
  const {
  input,
  type,
  meta: {touched, error},
  ...rest
} = props
  console.log('check value',rest, input)
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
