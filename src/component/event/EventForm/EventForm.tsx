import * as React from 'react'
import { TextField } from '@material-ui/core'
import { useState } from 'react'
import Button from '@material-ui/core/Button'
import { generate } from 'src/utils/DATA'
import { IAttendee, IEvent } from './../../../model/model';


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

interface Iprops {
  event: IEvent | null
  
  createEvent(form: IEvent): void
  
  editEvent(form: IEvent): void
}

const EventForm: React.SFC<Iprops> = (props: Iprops) => {
  const [form, update] = useState(state)
  
  React.useEffect(
    () => {
      if (props.event && props.event !== null) {
        const {title, city, description, category} = props.event
        update({title, city, description, category} as FormValue)
      } else {
        update(state)
      }
    },
    [props.event],
  )
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let {name, value} = e.target
    
    update({
      ...form,
      [name]: value,
    })
  }
  
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
    } else {
      f = createNewEvent(form)
      props.createEvent(f)
    }
    update(state)
  }
  
  return (
    
    <form autoComplete='off' onSubmit={handleSubmit} style={{display: flex, flexDirection: 'column', margin: '0 auto'}}
          className={'row'}>
      <TextField id='title' name='title' label='title' value={form.title} onChange={handleChange}/>
      <TextField id='city' name='city' label='city' value={form.city} onChange={handleChange}/>
      <TextField id='description' name='description' label='description' value={form.description}
                 onChange={handleChange}/>
      <TextField id='category' name='category' label='category' value={form.category} onChange={handleChange}/>
      <Button type='submit' color='secondary' variant='contained'>
        {props.event === null ? 'create Event' : 'update Event'}
      </Button>
    </form>
  )
}

export default EventForm
