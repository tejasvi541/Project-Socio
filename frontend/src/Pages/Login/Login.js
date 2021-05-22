import React from 'react';
import LoginCard from './../../Components/LoginCard/LoginCard';
import { makeStyles } from '@material-ui/core';

/* Using material-ui 'makestyle' hook */

const useStyles = makeStyles(() => ({
  root: {
    padding: 0,
    margin: 0,
    width: '100%',
    height: '100vh',
    backgroundColor: '#3AAFA9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function Login() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
        <LoginCard />
      </div>
    </div>
  );
}

export default Login;
