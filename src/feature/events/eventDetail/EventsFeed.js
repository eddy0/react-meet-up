import React from 'react';
import {Feed, Header, Segment} from "semantic-ui-react";

function EventsFeed(props) {
    const image = '/assets/user.png'
    const date = '3 days ago'
    const summary = 'Diana joined an Event'
    return (
        <>
            <Header attached color={'teal'} icon={'newspaper'} content={'News feed'} />
            <Segment attached={'bottom'}>
                <Feed>
                    <Feed.Event image={image} date={date} summary={summary} />
                    <Feed.Event image={image} date={date} summary={summary} />
                    <Feed.Event image={image} date={date} summary={summary} />
                    <Feed.Event image={image} date={date} summary={summary} />
                </Feed>
            </Segment>
        </>
    );
}

export default EventsFeed;