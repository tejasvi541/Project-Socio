import React from 'react';
import LoginCard from './../../Components/LoginCard/LoginCard';
import { makeStyles } from '@material-ui/core';
import RegisterCard from './../../Components/RegisterCard/RegisterCard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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
    ['@media(max-Width: 480px)']: {
      height: '800px',
    },
  },
}));

function Login(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
        {props.in ? <LoginCard /> : null}
        {props.up ? <RegisterCard /> : null}
        {/* <LoginCard />
        <RegisterCard /> */}
      </div>
    </div>
  );
}

export default Login;
