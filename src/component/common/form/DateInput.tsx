import * as React from 'react'
import { TextField } from '@material-ui/core'
import { IFormProps } from './types'


const DateInput: React.SFC<IFormProps> = (props) => {
  const {
    input,
    type,
    meta: {touched, error},
    ...rest
  } = props
  return (
    <TextField
      error={ touched && error }
      { ...input }
      { ...rest }
      type= {type}
      defaultValue="2017-05-24"
      InputLabelProps={ {
        shrink: true,
      } }
    />
  )
}


export default DateInput
