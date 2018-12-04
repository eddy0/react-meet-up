import * as React from 'react'
import { TextField } from '@material-ui/core'
import { WrappedFieldProps } from 'redux-form'
// import { InputHTMLAttributes } from 'react'
import { TextFieldProps } from '@material-ui/core/TextField'


type ITextInputProps =  WrappedFieldProps

const TextInput: React.SFC<ITextInputProps & Partial<TextFieldProps> > = ({
  input,
  label,
  meta: {touched, error},
  ...custom
}) => {
  return (
    <TextField
      error={touched && !!error}
      label={ label }
      { ...input }
      { ...custom }
    />
  
  )
}


export default TextInput
