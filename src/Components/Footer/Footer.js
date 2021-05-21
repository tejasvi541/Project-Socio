import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '45px',
    backgroundColor: 'rgba(23, 37, 42, 1)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position : 'fixed',
    bottom : 0
  },
  text: {
    fontFamily: 'Droid Sans',
    color: 'white',
    fontWeight: 'normal',
    fontSize: 14,
    '&:hover': {
      cursor: 'pointer',
      color: '#334443',
    },
  },
}));

function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h3 className={classes.text}>Copyright 2021</h3>
    </div>
  );
}

export default Footer;
