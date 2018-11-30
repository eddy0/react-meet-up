import * as React from 'react';
import { Card, CardHeader } from '@material-ui/core';

interface EventDetailedChatProps {
}

const EventDetailedChat: React.SFC<EventDetailedChatProps> = (props) => {
  return (
    <Card className='mg_t--sm'>
      <CardHeader title='chat about this event' />
      
    </Card>
  )
};

export default EventDetailedChat;