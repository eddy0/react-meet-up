import * as React from 'react'
import Button from '@material-ui/core/Button'
import { IEvent } from '../../../model/model'
import { connect } from 'react-redux'
import { StoreState } from '../../../reducer'
import { RouteComponentProps } from 'react-router-dom'
import { actionCreateEvent, actionUpdateEvent } from '../../../action/eventAction'
import TextInput from '../../common/form/TextInput'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import TextArea from '../../common/form/TextArea'
import SelectInput from '../../common/form/SelectInput'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'
import DateInput from '../../common/form/DateInput'
import { Paper } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'


const categories = [
  {
    value: 'culture',
    label: 'culture',
  },
  {
    value: 'learning',
    label: 'learning',
  },
  {
    value: 'study',
    label: 'study',
  },
  {
    value: 'checking',
    label: 'checking',
  },
]

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
      <div className="row">
        <Grid item xs={ 4 }>
          <Paper style={ {padding: '2rem'} }>
            <form autoComplete="off"
                  onSubmit={ this.props.handleSubmit(() => this.formSubmit) }
                  style={ {display: 'flex', flexDirection: 'column'} }
                  className="row"
            >
              <Typography>Event Details</Typography>
              <Field name="title"
                     type="text"
                     label="title"
                     component={ TextInput }
              />
              <Field name="select"
                     fullWidth={ false }
                     label="category"
                     component={ SelectInput }
              >
                {
                  categories.map(option => (
                    <MenuItem key={ option.value } value={ option.value }>
                      { option.label }
                    </MenuItem>
                  ))
                }
              </Field>
              <Field name="description"
                     type="text"
                     rows={ 4 }
                     label="description"
                     component={ TextArea }
              />
              
              <Typography className="mg_t--sm">Event Details</Typography>
              <Field name="city"
                     type="text"
                     label="city"
                     component={ TextInput }
              />
              
              <Field name="date"
                     type="input"
                     component={ DateInput }
              />
              
              <Button type="submit" color="secondary" variant="contained">
                { event !== null ? 'update Event' : 'create Event' }
              </Button>
            </form>
          </Paper>
        </Grid>
      </div>
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

const mapActionsToProps: {} = {
  createEvent: actionCreateEvent,
  editEvent: actionUpdateEvent,
}

export default connect(mapStateToProps, mapActionsToProps)(reduxForm<{}, Iprops>({form: 'form'})(EventForm))
