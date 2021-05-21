import React from 'react';
import { makeStyles } from '@material-ui/core';
import LeftLoginSubCard from './LeftLoginSubCard/LeftLoginSubCard';
import SignInWithSocial from './SignInWithSocial/SignInWithSocial';

const useStyles = makeStyles(() => ({
  root: {
    padding: 0,
    margin: 0,
    width: '500px',
    height: '290px',
    backgroundColor: '#DEF2F1',
    borderRadius: '18px',
    boxShadow: 'rgba(0, 0, 0, 0.18) 0px 2px 4px',
    display : 'flex',
    flexDirection :'row',
  },
}));

function LoginCard() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <LeftLoginSubCard />
      <SignInWithSocial />
    </div>
  );
}

export default LoginCard;
