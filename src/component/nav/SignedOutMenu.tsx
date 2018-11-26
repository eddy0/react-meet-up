import * as React from 'react'
import  Grid  from '@material-ui/core/Grid'
import  Button  from '@material-ui/core/Button'

// export interface SignedOutMenuProps {
// }

export default class SignedOutMenu extends React.Component<{}, any> {
  public render() {
    return (
      <Grid container item justify='flex-end' alignItems='center' style={{ width: 'max-content' }}>
        <Button variant='outlined' color='secondary'>
          login
        </Button>
        <Button variant='text' color='secondary' style={{ margin: '0 0.5rem' }}>
          sign up
        </Button>
      </Grid>
    )
  }
}
