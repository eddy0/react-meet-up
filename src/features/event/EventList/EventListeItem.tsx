import ButtonBase from "@material-ui/core/ButtonBase/ButtonBase";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import * as React from 'react'
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider/Divider';

// export interface EventListeItemProps {
//
// }

class EventListeItem extends React.Component<{}, any> {
  public render() {
    return (
      <Paper style={{marginBottom: '1rem', flexBasis: '50%'}}>
        <Grid container={true} spacing={8}>
          <Grid item={true}>
            <ButtonBase>
              <img alt="complex" src="./assets/images/user.png" style={{width: 50, height: 50}} />
              <Grid item={true} xs={true} container={true} direction="column" spacing={8}>
                <Typography gutterBottom={false} variant="subtitle1">
                  the Event name
                </Typography>
                <Typography gutterBottom={true} variant="body2">
                  hosted by me
                </Typography>
              </Grid>
            </ButtonBase>
          </Grid>
        </Grid>
        <Divider/>
        <Grid item={true} xs={12} sm={true} container={true}>
          <Grid item={true} xs={true} container={true} spacing={16}>
            <Grid item={true} xs={true}>
              <Typography gutterBottom={true} variant="subtitle1">
                Standard license
              </Typography>
              <Typography gutterBottom={true}>Full resolution 1920x1080 • JPEG</Typography>
              <Typography color="textSecondary">ID: 1030114</Typography>
            </Grid>
            <Grid item={true}>
              <Typography style={{cursor: 'pointer'}}>Remove</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

export default EventListeItem

