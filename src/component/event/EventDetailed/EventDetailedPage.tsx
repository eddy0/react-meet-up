import * as React from 'react'
import { Grid, Divider  } from '@material-ui/core'
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';
import { connect } from 'react-redux';
import { StoreState } from './../../../reducer/index';
import { IEvent } from 'src/model/model';
import { RouteComponentProps } from 'react-router-dom';

interface EventDetailedPageProps extends RouteComponentProps<{id: string}>{

}


const EventDetailedPage: React.SFC<EventDetailedPageProps> = (props) => {
  return (
    <div className='row'>
      <Grid container={true} style={{justifyContent: 'space-between'}}>
        <Grid item xs={7}>
          <EventDetailedHeader />
          <Divider />
          <EventDetailedInfo />
          <EventDetailedChat />
        </Grid>
        <Grid item xs={4}>
          <EventDetailedSidebar />
        </Grid>
      </Grid>
    </div>
  )
}


type OwnProps = RouteComponentProps<{id: string}>;

const mapStateToProps = (state:StoreState, props: OwnProps) => {
  const id = props.match.params.id
  let event:IEvent = state.events.filter((event:IEvent) => event.id === id)[0]
  return {
    event: event
  }
}

export default connect(mapStateToProps)(EventDetailedPage)

