import * as React from 'react'
import { FieldProps } from 'formik';
import { TextField } from '@material-ui/core'

interface TextInputProps extends FieldProps{
  id:'string'
  name:'string'
  label:'string'
  value: string
  onChange: () => handleChange
}

const TextInput: React.SFC<TextInputProps> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div>
    <TextField type="text" {...field} {...props}  />
    {touched[field.name] &&
      errors[field.name] && <div className="error">{errors[field.name]}</div>}
  </div>
);

export default TextInput;
