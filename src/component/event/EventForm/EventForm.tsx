import * as React from 'react'
import { TextField } from '@material-ui/core'
import { useState } from 'react'
import Button from '@material-ui/core/Button'
import { generate, IEvent } from 'src/utils/DATA'
import { IAttendee } from './../../../utils/DATA'

interface FormValue {
  title: string
  city: string
  description: string
  category: string
}

const state: FormValue = {
  title: '',
  city: '',
  description: '',
  category: '',
}

interface Iprops {
  createEvent(form: IEvent): void
}

const EventForm: React.SFC<Iprops> = (props: Iprops) => {
  const [form, update] = useState(state)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let { name, value } = e.target

    update({
      ...form,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const id: string = generate()
    const date: string = new Date(Date.now()).toLocaleString()
    const attendees: IAttendee[] = [{
      id: 'a',
      name: 'Bob',
      photoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    }]

    const f: IEvent = { ...form, id, date, attendees }
    props.createEvent(f)
    update(state)
  }

  return (
    <form autoComplete='off' onSubmit={handleSubmit}>
      <TextField id='title' name='title' label='title' value={form.title} onChange={handleChange} />
      <TextField id='city' name='city' label='city' value={form.city} onChange={handleChange} />
      <TextField id='description' name='description' label='description' value={form.description} onChange={handleChange} />
      <TextField id='category' name='category' label='category' value={form.category} onChange={handleChange} />
      <Button type='submit' color='secondary' variant='contained'>
        create a new event
      </Button>
    </form>
  )
}

export default EventForm
