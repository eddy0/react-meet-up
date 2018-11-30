import * as React from 'react';
import { Card, CardContent, CardHeader } from '@material-ui/core';

interface EventDetailedHeaderProps {
}

const EventDetailedHeader: React.SFC<EventDetailedHeaderProps> = (props) => {
  return (
    <Card style={{width:'100%'}}>
      <CardHeader title='header'  />
      <div style={{width: '100%'}}>
        <img style={{display: 'block',width: '100%', height: 'auto'}} src="/assets/categoryImages/culture.jpg" alt="culture"/>
      </div>
      <CardContent>this is the content</CardContent>
    </Card>
  )
};

export default EventDetailedHeader;