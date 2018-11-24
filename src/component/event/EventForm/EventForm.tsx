import * as React from 'react'
import { TextField } from '@material-ui/core'
import { useState } from 'react'
import Button from '@material-ui/core/Button';

export interface FormValue {
  name: string
  username: string
  password: string
  todo: string
}

const state: FormValue = {
  name: '',
  username: '',
  password: '',
  todo: '',
}


interface Iprops {
  createEvent(form:FormValue):void
}


const EventForm: React.SFC<Iprops> = (props:Iprops) => {
  const [form, update] = useState(state)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let { name, value } = e.target

    update({
      ...form,
      [name]: value,
    })
  }

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    props.createEvent(form)
  }

  return (
    <form autoComplete='off' onSubmit={handleSubmit}>
      <TextField id='name' name='name' label='name' value={form.name} onChange={handleChange} />
      <TextField id='username' name='username' label='username' value={form.username} onChange={handleChange} />
      <TextField id='password' name='password' label='password' value={form.password} onChange={handleChange} />
      <TextField id='todo' name='todo' label='todo' value={form.todo} onChange={handleChange} />
      <Button type='submit' color="secondary" variant='contained' >create a new event</Button>
    </form>
  )
}

export default EventForm
