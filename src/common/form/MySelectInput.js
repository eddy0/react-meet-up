import React from 'react'
import { useField } from 'formik'
import { FormField, Label, Select } from 'semantic-ui-react'

const MySelectInput = ({label, ...props}) => {
  const [field, meta, helpers] = useField(props)
  return (
    <FormField className='myform' error={meta.touched && !!meta.error}>
      <label>
        {label}
      </label>
      <Select
        clearable={true}
        value={field.value || null}
        onChange={(e, data) => helpers.setValue(data.value)}
        onBlur={() => helpers.setTouched(true)}
        {...props}
      />
      {meta.touched && meta.error ? (
        <Label basic={true} color={'red'}>{meta.error}</Label>
      ) : null}
    </FormField>
  )
}

export default MySelectInput