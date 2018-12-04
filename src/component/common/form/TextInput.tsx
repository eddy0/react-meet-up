import * as React from 'react'
import { FieldProps, Field } from 'formik';
import { TextField } from '@material-ui/core'
import { TextFieldProps } from '@material-ui/core/TextField';

// type TextInputProps =  TextFieldProps


const TextInput: React.SFC<TextFieldProps> = (props) => {
  console.log(props)
  return (
  <Field
    name='city'
    component={({
      field, // { name, value, onChange, onBlur }
      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    }: FieldProps) => {
      const  { name, value, onChange, onBlur } = field
      return (
        <div>
          <input name='good' {...field} /> 
          <TextField label={name} name={name} value={value} onChange={onChange} onBlur={onBlur}  />
          {touched[field.name] && errors[field.name] && <div className='error'>{errors[field.name]}</div>}
        </div>
      )
    }}
  />
)}

export default TextInput
