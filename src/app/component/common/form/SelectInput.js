import React from 'react'
import {Form, Icon, Label, Select} from 'semantic-ui-react'

const category = [
    {key: 'drinks', text: 'Drinks', value: 'drinks', icon: 'smile'},
    {key: 'culture', text: 'Culture', value: 'culture', icon: 'coffee'},
    {key: 'film', text: 'Film', value: 'film', icon: 'film'},
    {key: 'food', text: 'Food', value: 'food', icon: 'utensils'},
    {key: 'music', text: 'Music', value: 'music', icon: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel', icon: 'plane'},
]


const SelectInput = (props) => {
    const {input, type, multiple, placeholder, label, required, meta: { touched, error, warning }} = props

    return (
        <Form.Field required={required} error={touched && !!error}>
            <label>{label}</label>
            <Select
                value={input.value || null}
                onChange={(e, data) => input.onChange(data.value)}
                placeholder={placeholder}
                options={category}
                multiple={multiple}
            />
            {
                touched && !error && !warning &&
                <Icon name="check circle" color="green" />
            }

            {
                touched &&
                ((error && <Label color="red" pointing="left">{error}</Label>) ||
                    (warning && <Label color="orange" pointing="left">{warning}</Label>))
            }

            {touched && error && <Label basic>{error}</Label>}
        </Form.Field>
    )
}

export default SelectInput