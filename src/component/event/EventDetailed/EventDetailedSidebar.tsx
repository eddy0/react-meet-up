import * as React from 'react'
import { Paper, Typography, Avatar, Chip } from '@material-ui/core'
import styled from 'styled-components'
import { PaperProps } from '@material-ui/core/Paper'

interface EventDetailedSidebarProps {}

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

const EventDetailedSidebar: React.SFC<EventDetailedSidebarProps> = (props) => {
  return (
    <SideBar>
      <Typography gutterBottom={true} align={'center'} variant='h5'>
        2 people is going
      </Typography>
      <ChipArea>
        <Chip label='Basic Chip' variant='outlined' avatar={<Avatar src='/assets/images/user.png'>MB</Avatar>} />
        <Chip label='Basic Chip' variant='outlined' avatar={<Avatar src='/assets/images/user.png'>MB</Avatar>} />
        <Chip label='Basic Chip' avatar={<Avatar>MB</Avatar>} />
        <Chip label='Basic Chip' avatar={<Avatar>MB</Avatar>} />
        <Chip label='Basic Chip' avatar={<Avatar>MB</Avatar>} />
        <Chip label='Basic Chip' avatar={<Avatar>MB</Avatar>} />
        <Chip label='Basic Chip' avatar={<Avatar>MB</Avatar>} />
        <Chip label='Basic Chip' avatar={<Avatar>MB</Avatar>} />

      </ChipArea>
    </SideBar>
  )
}

export default EventDetailedSidebar
