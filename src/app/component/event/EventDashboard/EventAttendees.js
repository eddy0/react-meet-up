import React from 'react'
import { Avatar, Row, Tooltip } from 'antd'
import styled from 'styled-components'


const StyledAvatar = styled(Tooltip)`
  && {
    box-shadow: 0px 5px 15px rgba(0,0,0,0.3); 
    margin-right: -5px;
    border: 2px solid #fff;
    box-sizing: content-box;
  }
`

function EventAttendees(props) {
  return (
    <Row>
      {
        props.attendees.map((attendee) => {
          return (
            <StyledAvatar title={attendee.name} key={attendee.id}>
              <Avatar id={attendee.id} src={attendee.photoURL}/>
            </StyledAvatar>
          )
        })
      }
    </Row>
  )
}

export default EventAttendees