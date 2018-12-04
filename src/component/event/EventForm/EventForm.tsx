import * as React from 'react'
import { useState } from 'react'
import Button from '@material-ui/core/Button'
import { generate } from 'src/utils/DATA'
import { IAttendee, IEvent } from './../../../model/model';
import { connect } from 'react-redux'
import { StoreState } from '../../../reducer'
import { RouteComponentProps } from 'react-router-dom';
import { actionCreateEvent, actionUpdateEvent } from '../../../action/eventAction'
import TextInput from '../../common/form/TextInput'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import TextArea from '../../common/form/TextArea'
import SelectInput from '../../common/form/SelectInput'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

// const SelectMenu: React.SFC<any> = () => {
//   return (
//     <div>
//       {
//         currencies.map(option => (
//           <MenuItem key={ option.value } value={ option.value }>
//             { option.label }
//           </MenuItem>
//         ))
//       }
//     </div>
//   )
// }

interface FormValue {
  id?: string
  date?: string
  attendees?: IAttendee[]
  title: string
  city: string
  description: string
  category: string
}

const state: IEvent | FormValue = {
  title: '',
  city: '',
  description: '',
  category: '',
}

interface Iprops extends RouteComponentProps<{ id: string }> {
  event: IEvent | null
  
  createEvent(form: IEvent): void
  
  editEvent(form: IEvent): void
}


const EventForm: React.SFC<InjectedFormProps & Iprops> = (props) => {
  const [form, update] = useState(state)
  
  React.useEffect(
    () => {
      if (props.event) {
        const {title, city, description, category} = props.event
        update({title, city, description, category} as FormValue)
      } else {
        update(state)
      }
    },
    [props.event],
  )
  
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   let {name, value} = e.target
  //
  //   update({
  //     ...form,
  //     [name]: value,
  //   })
  // }
  //
  const createNewEvent = (form: FormValue): IEvent => {
    const id: string = generate()
    const date: string = new Date(Date.now()).toLocaleString()
    const attendees: IAttendee[] = [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
      },
    ]
    const f: IEvent = {...form, id, date, attendees}
    return f
  }
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    let f: IEvent
    if (props.event !== null) {
      f = {...props.event, ...form}
      props.editEvent(f)
      props.history.goBack()
    } else {
      f = createNewEvent(form)
      props.createEvent(f)
      props.history.push('/events')
    }
  }
  
  return (
    <form autoComplete="off"
          onSubmit={ handleSubmit }
          style={ {display: 'flex', flexDirection: 'column', margin: '0 auto'} }
          className="row"
    >
      <Field name="title"
             type="text"
             component={ (withRef, props) => <TextInput { ...props } { ...withRef } fullWidth={ true } label="title" /> }
      />
      <Field name="city"
             type="text"
             component={ (withRef, props) => <TextInput { ...props } { ...withRef } fullWidth={ true } label="city" /> }
      />
      <Field name="description"
             type="text"
             component={ (withRef, props) => <TextInput  { ...props } { ...withRef } fullWidth={ true } label="description" /> }
      />
      <Field name="category"
             type="text"
             component={ (withRef, props) => <TextInput { ...props } { ...withRef } fullWidth={ true } label="category" /> }
      />
      <Field name="category"
             type="text"
             component={ (withRef, props) => <TextInput { ...props } { ...withRef } fullWidth={ true } label="category" /> }
      />
      <Field name="category"
             component={ (withRef, props) => <TextArea { ...props } { ...withRef } rows="4" fullWidth={ true } label="category" /> }
      />
      
      <Field name="select"
             component={ (withRef, props) => <SelectInput { ...props } { ...withRef } fullWidth={ false } label="select" /> }
      >
                {
        currencies.map(option => (
          <MenuItem key={ option.value } value={ option.value }>
            { option.label }
          </MenuItem>
        ))
      }
      </Field>
      
      {/*<TextField id="title" name="title" label="title" value={ form.title } onChange={ handleChange } />*/ }
      {/*<TextField id="city" name="city" label="city" value={ form.city } onChange={ handleChange } />*/ }
      {/*<TextField id="description" name="description" label="description" value={ form.description }*/ }
      {/*onChange={ handleChange } />*/ }
      {/*<TextField id="category" name="category" label="category" value={ form.category } onChange={ handleChange } />*/ }
      <Button type="submit" color="secondary" variant="contained">
        { props.event === null ? 'create Event' : 'update Event' }
      </Button>
    </form>
  )
}


const mapStateToProps = (state: StoreState, props: Iprops) => {
  const id = props.match.params.id
  let event = null
  if (id && state.events.length > 0) {
    event = state.events.filter((event) => event.id === id)[0]
  }
  return {
    initialValue: event,
  }
}

const mapActionsToProps = {
  createEvent: actionCreateEvent,
  editEvent: actionUpdateEvent,
}

export default connect(mapStateToProps, mapActionsToProps)(reduxForm({enableReinitialize:true ,form: 'event'})(EventForm))
