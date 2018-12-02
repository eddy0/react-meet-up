import * as React from 'react'
import { Paper, Typography, Avatar, Chip, Divider, Tooltip } from '@material-ui/core'
import styled from 'styled-components'
import { PaperProps } from '@material-ui/core/Paper'
import { IAttendee } from 'src/model/model'

const SideBar: React.SFC<PaperProps> = styled(Paper)`
  padding: 1rem;
  margin: 0 auto;
  width: 100%;
`

const ChipArea = styled.div`
  & div {
    margin: 5px;
    flex-wrap: wrap;
  }
`

interface EventDetailedSidebarProps {
  attendees: IAttendee[]
}

const EventDetailedSidebar: React.SFC<EventDetailedSidebarProps> = ({ attendees }) => {
  return (
    <SideBar>
      <Typography gutterBottom={true} align={'center'} variant='h5'>
        {
          attendees.length > 1 
          ? `${attendees.length} people is going` 
          : `${attendees.length} person is going` 
        }  
      </Typography>
      <Divider />
      <ChipArea>
        {attendees.map((attendee: IAttendee) => {
          return (
            <Tooltip title={attendee.name} key={attendee.id}>
              <Chip  label='Basic Chip' variant='outlined' avatar={<Avatar src={attendee.photoURL}>{attendee.name}</Avatar>} />
            </Tooltip>
          )  
         })}
      </ChipArea>
    </SideBar>
  )
}

export default EventDetailedSidebar
