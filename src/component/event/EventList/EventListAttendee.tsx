import * as React from 'react'
import styled from 'styled-components'
import {  IAttendee } from './../../../model/model'
import { Avatar,  Tooltip, Fab } from '@material-ui/core'

const AttendeeList = styled.div`
  display: flex;

  & button {
    box-sizing: content-box;
    border: 3px solid #6b9aaf;
  }

  & button:not(:first-child) {
    margin-left: -0.5rem;
  }
`

interface IEventAttendeeProps {
  attendees: IAttendee[]
}

export default class EventAttendee extends React.Component<IEventAttendeeProps> {
  render() {
    const { attendees } = this.props
    return (
      <AttendeeList>
        {attendees.map((attendee) => {
          return (
            <Tooltip title={attendee.name} key={attendee.id}>
              <Fab variant='round' >
                <Avatar src={attendee.photoURL} alt={attendee.name} />
              </Fab>
            </Tooltip>
          )
        })}
      </AttendeeList>
    )
  }
}