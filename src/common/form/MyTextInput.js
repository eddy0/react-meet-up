import React from 'react'
import { useField } from 'formik'
import { FormField, Label } from 'semantic-ui-react'

const MyTextInput = ({label, ...props}) => {
  const [field, meta, helpers] = useField(props)
  return (
    <FormField error={meta.touched && !!meta.error} style={{minHeight: 70}}>
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