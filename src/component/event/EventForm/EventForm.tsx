import * as React from 'react'
import Button from '@material-ui/core/Button'
// import { generate } from 'src/utils/DATA'
import {IEvent} from '../../../model/model'
import {connect} from 'react-redux'
import {StoreState} from '../../../reducer'
import {RouteComponentProps} from 'react-router-dom'
import {actionCreateEvent, actionUpdateEvent} from '../../../action/eventAction'
import TextInput from '../../common/form/TextInput'
import {Field, reduxForm, InjectedFormProps} from 'redux-form'
import TextArea from '../../common/form/TextArea'
import SelectInput from '../../common/form/SelectInput'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'
import DateInput from '../../common/form/DateInput'
import { IFormProps } from '../../common/form/types';

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
]

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

// interface FormValue {
//   id?: string
//   date?: string
//   attendees?: IAttendee[]
//   title: string
//   city: string
//   description: string
//   category: string
// }

// const state: IEvent | FormValue = {
//   title: '',
//   city: '',
//   description: '',
//   category: '',
// }

interface Iprops extends RouteComponentProps<{ id: string }> {
  event: IEvent | null

  createEvent(form: IEvent): void

  editEvent(form: IEvent): void
}


class EventForm extends React.Component<InjectedFormProps<{}, Iprops> & Iprops> {

  formSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    // let f: IEvent
    // if (props.event !== null) {
    //   f = {...props.event, ...form}
    //   props.editEvent(f)
    //   props.history.goBack()
    // } else {
    //   f = createNewEvent(form)
    //   props.createEvent(f)
    //   props.history.push('/events')
    // }
  }

  render() {
    const event = this.props.event
    return (
      <form autoComplete="off"
            onSubmit={this.props.handleSubmit(() => this.formSubmit)}
            style={{display: 'flex', flexDirection: 'column', margin: '0 auto'}}
            className="row"
      >
        <Field name="title"
               type="text"
               label='title'
               component={TextInput}
        />
        <Field name="city"
               type="text"
               label='city'
               component={TextInput}
        />
        <Field name="description"
               type="text"
               label="description"
               component={TextInput}
        />
        <Field name="category"
               type="text"
               rows={4} label="category"
               component={TextArea}
        />
        <Field name="date"
               type="date"
               label="date"
               component={DateInput}
        />

        <Field name="select"
        fullWidth={false} 
        label="select"
        component={SelectInput}
        >
          {
            currencies.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))
          }
        </Field>
        <Button type="submit" color="secondary" variant="contained">
          {event !== null ? 'update Event' : 'create Event'}
        </Button>
      </form>
    )
  }
}


const mapStateToProps = (state: StoreState, props: Iprops) => {
  const id = props.match.params.id
  let event = {}
  if (id && state.events.length > 0) {
    event = state.events.filter((event) => event.id === id)[0]
  }
  return {
    initialValues: event,
  }
}

const mapActionsToProps:{} = {
  createEvent: actionCreateEvent,
  editEvent: actionUpdateEvent,
}

export default connect(mapStateToProps, mapActionsToProps)(reduxForm<{}, Iprops>({form: 'form'})(EventForm))
