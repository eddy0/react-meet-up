import * as React from 'react'
import DatePicker from 'antd/lib/date-picker';
import { DatePickerProps } from 'antd/lib/date-picker/interface';
import { WrappedFieldProps } from 'redux-form';
import moment from 'moment'
import 'antd/dist/antd.css'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl';
import styled from 'styled-components'


const PickDiv = styled(DatePicker)`
  && {
    margin: 1rem;
    position: relative;
    display: block;
  }
` as React.SFC<DatePickerProps>

type DateProps = DatePickerProps & WrappedFieldProps


const TimeInput = (props: DateProps) => {
  let {
    input: {value, onChange, ...restInput},
    meta: {error, touched},
    ...rest
  } = props
  const dateFormat = 'MM-DD-YYYY'
  value = value ? moment(value, dateFormat) : moment()
  return (
    <FormControl error={ error && touched } fullWidth={ true } style={{borderBottom: '1px solid'}} >
      <FormLabel>date</FormLabel>
      <PickDiv
        className="input"
        onChange={ onChange }
        value={ value }
        { ...restInput }
        format={ dateFormat }
        { ...rest }
      />
    </FormControl>
  );
}


export default TimeInput
