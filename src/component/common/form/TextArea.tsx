import * as React from 'react'
import { TextField } from '@material-ui/core'
import { IFormProps } from './types'


const TextArea: React.SFC<IFormProps> = (props) => {
  const {
    rows,
    input,
    type,
    meta: {touched, error},
    ...rest
  } = props
  return (
    <TextField
      multiline={ true }
      rows={ rows }
      type={ type }
      error={ touched && error }
      { ...input }
      { ...rest }
    />
  )
}


export default TextArea
