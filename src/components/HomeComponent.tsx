import { Button, createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import statueOfLiberty from '../images/statue-of-liberty.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: '90vh',
      backgroundImage: `url(${statueOfLiberty})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right',
      margin: '20px',
    },
  })
);

export function HomeComponent() {
  let history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2" noWrap>
            Majority Wins
          </Typography>
          <Typography variant="h5" noWrap>
            It’s Time for a Change™
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Button
            color="primary"
            onClick={() => {
              history.push('/voters');
            }}
            variant="contained"
          >
            Register Voters
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              history.push('/capturevotes');
            }}
          >
            Capture Votes
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              history.push('/elections');
            }}
          >
            Election Creation
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
