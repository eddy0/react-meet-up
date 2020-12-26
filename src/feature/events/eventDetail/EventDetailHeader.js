import React, { useState } from 'react'
import { Header, Image, Item, Segment, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { addUserAttendance, cancelUserAttendance } from '../../../app/firestore/fireStoreService'

const eventImageStyle = {
  filter: 'brightness(30%)',
}

const eventImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white',
}

const EventDetailHeader = ({event, isGoing, isHost}) => {
  let {id, title, date, category, hostedBy} = event
  const [loading, setLoading] = useState(false)
  date = format(date, 'MMMM d, yyyy h:mm a')
  
  const handleUserJoinEvent = async () => {
    setLoading(true)
    try {
      await addUserAttendance(event)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  
  const handleUserLeaveEvent = async () => {
    setLoading(true)
    try {
      await cancelUserAttendance(event)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{padding: '0'}}>
        <Image src={`/assets/categoryImages/${category}.jpg`} fluid style={eventImageStyle}/>
        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={title}
                  style={{color: 'white'}}
                />
                <p>{date}</p>
                <p>
                  Hosted by <strong><Link to={`/profile/${event.hostUid}`}>{hostedBy}</Link> </strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      
      <Segment attached="bottom" clearing>
        {
          !isHost &&
          <>
            {isGoing
              ? <Button onClick={handleUserLeaveEvent} loading={loading}>Cancel My Place</Button>
              : <Button color="teal" loading={loading} onClick={handleUserJoinEvent}>JOIN THIS EVENT</Button>
            }
          </>
        }
        
        {
          isHost &&
          <Button color="orange" floated="right" as={Link} to={`/manage/${id}`}>
            Manage Event
          </Button>
        }
      </Segment>
    </Segment.Group>
  
  )
}

export default EventDetailHeader