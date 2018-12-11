import * as React from 'react'
import DatePicker from 'antd/lib/date-picker';
import { DatePickerProps} from "antd/lib/date-picker/interface";
import {WrappedFieldProps} from "redux-form";


type DateProps = DatePickerProps & WrappedFieldProps

function onChange(date:string, dateString: string) {
  console.log(date, dateString);
}

const DateInput = (props:DateProps) => {
  const {
    input:{value,...other},
    ...rest
  } = props

    return (
            <DatePicker
                onChange={onChange}
                value={value}
                {...other}
                {...rest}
                format={'MM/DD/YYYY'}
            />
    );
}


export default DateInput
