import React from 'react'
import { Form, Label } from 'semantic-ui-react'
import 'flatpickr/dist/themes/material_green.css'
import Flatpickr from 'react-flatpickr'

const DateInput = ({input, type, placeholder, meta: {touched, error}}) => {
  return (
    <Form.Field error={touched && !!error}>
      <Flatpickr data-enable-time
                 value={input.value || ''}
                 onChange={(e, data) => {
                   input.onChange(data)
                 }
                 }
                 placeholder={placeholder}
      />
      {touched && error && <Label basic color='red'>{error}</Label>}
    </Form.Field>
  )
}

export default DateInput

