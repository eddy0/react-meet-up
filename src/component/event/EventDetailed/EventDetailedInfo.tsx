import * as React from 'react'
import { Card, Divider, Typography } from '@material-ui/core'
import { InfoOutlined, CalendarToday, LocationOn } from '@material-ui/icons'
import styled from 'styled-components'

const CardInfo = styled.div`
  display: flex;
  padding: 1rem;
  position: relative;
  align-items: center;

  & svg {
    margin-right: 1rem;
  }

`


interface EventDetailedInfoProps {}


const EventDetailedInfo: React.SFC<EventDetailedInfoProps> = (props) => {
  return (
    <Card className='mg_t--sm'>
      <CardInfo>
        <InfoOutlined />
        <Typography variant='body1'> event info </Typography>
      </CardInfo>
      <Divider />
      <CardInfo>
        <CalendarToday />
        <Typography variant='body1'>event data</Typography>
      </CardInfo>
      <Divider />
      <CardInfo>
        <LocationOn />
        <Typography variant='body1'> event address </Typography>
      </CardInfo>
    </Card>
  )
}

export default EventDetailedInfo
