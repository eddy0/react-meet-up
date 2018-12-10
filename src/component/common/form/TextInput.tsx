import * as React from 'react'
import { TextField } from '@material-ui/core'
import { IFormProps } from './types'

const TextInput= (props: IFormProps) => {
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
