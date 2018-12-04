import * as React from 'react'
import { TextField } from '@material-ui/core'
import { WrappedFieldProps } from 'redux-form'
// import { InputHTMLAttributes } from 'react'
// import { TextFieldProps } from '@material-ui/core/TextField'

interface ITextInputProps extends WrappedFieldProps  {
  label: string,
  type:string,
  width?: string,
}

const TextInput: React.SFC<ITextInputProps> = ({
  input,
  label,
  type,
  meta: {touched, error},
  ...custom
}) => {
  return (
    <TextField
      type={type}
      error={touched && !!error}
      label={ label }
      { ...input }
      { ...custom }
    />
  
  )
}


export default TextInput
