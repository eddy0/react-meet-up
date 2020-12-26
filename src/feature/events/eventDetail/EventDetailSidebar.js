import React from 'react'
import { Segment, Item, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const EventDetailSidebar = ({event}) => {
  const {attendees, hostUid} = event
  return (
    <>
      <Segment
        textAlign="center"
        style={{border: 'none'}}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        {attendees.length} {attendees.length > 1 ? 'People' : 'Person'}   People Going
      </Segment>
      
      <Segment attached>
        <Item.Group relaxed divided>
          {attendees.map((attendee) =>{
            const {id, displayName, photoURL} = attendee
            return (
              <Item as={Link} to={`/profile/${id}`} style={{position: 'relative'}} key={id}>
                {hostUid === id &&
                  <Label style={{position: 'absolute'}} color={'orange'} ribbon={'right'} content={'Host'} />
                }
                <Item.Image size="tiny" src={photoURL}/>
                <Item.Content verticalAlign="middle">
                  <Item.Header as="h3">
                    <span>{displayName}</span>
                  </Item.Header>
                </Item.Content>
              </Item>
            )
          })}
        </Item.Group>
      </Segment>
    </>
  )
}

export default EventDetailSidebar