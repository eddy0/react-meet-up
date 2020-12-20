import React from 'react'
import { Button, Form, Header, Segment } from 'semantic-ui-react'

const EventForm = () => {
  return (
    <Segment clearing>
      <Header content={'create new event'} />
      <Form >
        <Form.Field>
          <input type="text" placeholder={'event title'}/>
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder={'Category'}/>
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder={'Description'}/>
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder={'City'}/>
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder={'Venue'}/>
        </Form.Field>
        <Form.Field>
          <input type="date" placeholder={'Date'}/>
        </Form.Field>
        <Button type={'submit'} floated={'right'} positive={true} content={'submit'} />
        <Button type={'submit'} floated={'right'}  content={'cancel'} />
      </Form>

    </Segment>
  )
}

export default EventForm