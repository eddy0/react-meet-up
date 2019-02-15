import React, { Component } from 'react'
import { DatePicker } from 'antd'
import { Form, Label, Icon } from 'semantic-ui-react'
import moment from 'moment'


class DateInput extends Component {
  render() {
    let {input: {value, onChange, onBlur, ...restInput}, label, required, meta: {touched, error, warning}, ...rest} = this.props
    if (value) {
      value = moment(value)
    }
    return (
      <Form.Field required={required}>
        <label>{label}</label>
        <DatePicker
          value={value ? value : null}
          onChange={onChange}
          {...rest}
        />
        {
          touched &&
          ((error && <Label color='red' pointing='left'>{error}</Label>) ||
            (warning && <Label color='orange' pointing='left'>{warning}</Label>))
        }
        {
          touched && !error && !warning &&
          <Icon name='check circle' color='green'/>
        }
      </Form.Field>
    )
  }

}

export default DateInput