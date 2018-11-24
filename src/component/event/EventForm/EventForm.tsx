import * as React from 'react'
import { TextField } from '@material-ui/core'
import { useState } from 'react'

interface FormValue {
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



const EventForm: React.SFC = (props) => {
  const [form, update] = useState(state)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let { name, value } = e.target

    update({
      ...form,
      [name]: value,
    })
  }

  return (
    <form autoComplete='off'>
      <TextField id='name' name='name' label='name' value={form.name} onChange={handleChange} />
      <TextField id='username' name='username' label='username' value={form.username} onChange={handleChange} />
      <TextField id='password' name='password' label='password' value={form.password} onChange={handleChange} />
      <TextField id='todo' name='todo' label='todo' value={form.todo} onChange={handleChange} />
    </form>
  )
}

export default EventForm
