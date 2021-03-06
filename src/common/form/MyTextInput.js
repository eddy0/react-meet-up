import React from 'react'
import { useField } from 'formik'
import { FormField, Label } from 'semantic-ui-react'

const MyTextInput = ({label, ...props}) => {
  const [field, meta, helpers] = useField(props)
  return (
    <FormField className='myform' error={meta.touched && !!meta.error}>
      <label>
        {label}
      </label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <Label basic={true} color={'red'}>{meta.error}</Label>
      ) : null}
    </FormField>
  )
}

export default MyTextInput