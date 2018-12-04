import * as React from 'react'
import { IAttendee, IEvent } from './../../../model/model'
import { RouteComponentProps } from 'react-router-dom'
import { Formik} from 'formik'
import TextInput from 'src/component/common/form/TextInput';

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

const FormikForm: React.SFC<Iprops> = (props) => {
  return (
    <Formik
      initialValues={state}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          actions.setSubmitting(false)
        }, 1000)
      }}
    >
      {(props) => (
        <form autoComplete='off' style={{ display: 'flex', flexDirection: 'column', margin: '0 auto' }} className={'row'}>
          <TextInput {...props} />
        </form>
      )}
    </Formik>
  )
}

export default (FormikForm)
