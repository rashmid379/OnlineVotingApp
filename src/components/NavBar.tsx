import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import logo from '../images/logo.png';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  navButton: {
    marginRight: 16,
  },
  navLink: {
    display: 'flex',
    color: 'white',
    textDecoration: 'none',
  },
  navLogo: {
    height: 45,
    margin: 5,
  },
}));

export default function Navbar() {
  const classes = useStyles();
  let history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.title}>
            <Link className={classes.navLink} to="/">
              <img src={logo} alt="logo" className={classes.navLogo}></img>
              <div>
                <Typography variant="h6">Majority Wins</Typography>
                <Typography variant="subtitle2">It’s Time for a Change™</Typography>
              </div>
            </Link>
          </div>
          <Button
            className={classes.navButton}
            color="inherit"
            onClick={() => {
              history.push('/voters');
            }}
            variant="outlined"
          >
            Register Voters
          </Button>
          <Button
            className={classes.navButton}
            variant="outlined"
            color="inherit"
            onClick={() => {
              history.push('/capturevotes');
            }}
          >
            Capture Votes
          </Button>
          <Button
            className={classes.navButton}
            variant="outlined"
            color="inherit"
            onClick={() => {
              history.push('/elections');
            }}
          >
            Election Creation
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
