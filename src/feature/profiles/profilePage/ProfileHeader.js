import React from 'react'
import { Grid, Segment, Item, Header, Statistic, Divider, Reveal, Button } from 'semantic-ui-react'

function ProfileHeader(props) {
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image avatar size={'small'} src={'/assets/user.png'} />
              <Item.Content verticalAlign={'middle'}>
                <Header as={'h1'} style={{display: 'block', marginBottom: '10'}}
                  content={'Display Name'}
                />

              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group>
            <Statistic label={'Followers'} value={10} />
            <Statistic label={'Followering'} value={5} />
          </Statistic.Group>
          <Divider/>
          <Reveal animated={'move'}>
            <Reveal.Content visible style={{width: '100%'}}>
              <Button fluid  color='teal' content={'following'} />
            </Reveal.Content>
            <Reveal.Content hidden style={{width: '100%'}}>
              <Button basic fluid  color='teal' content={'Unfollow'} />
            </Reveal.Content>
          </Reveal>

        </Grid.Column>
      </Grid>

    </Segment>
  )
}

export default ProfileHeader