import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '../../Button/Button';

const useStyles = makeStyles(() => ({
  root: {
    margin: '1rem',
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    width: '100%',
    fontFamily: 'Droid Sans',
    fontWeight: 'Regular',
    fontSize: 13,
    textAlign: 'center',
  },
  input: {
    fontFamily: 'Droid Sans',
    fontSize: 12,
    textAlign: 'center',
    width: '80%',
    marginTop: 6,
    marginBottom: 6,
    height: '30px',
    borderStyle: 'none',
    borderRadius: '16px',
    backgroundColor: 'rgba(23, 37, 42, 1)',
    color: 'white',
    '&:focus': {
      outline: 'none',
    },
  },
  text_forget_pass: {
    margin: 0,
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
    width: '100%',
    fontFamily: 'Droid Sans',
    fontWeight: 'regular',
    fontSize: 11,
    textAlign: 'center',
    '&:hover': {
      cursor: 'pointer',
      color: '#334443',
    },
  },
}));

function LeftLoginSubCard() {
  const classes = useStyles();
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  const ButtonClickHandler = () => {
    console.log(username + password);
  };
  return (
    <div className={classes.root}>
      <h4 className={classes.text}>Sign In Here</h4>
      <input
        type="text"
        className={classes.input}
        placeholder="Username or Email Id"
        value={username}
        onChange={(e) => setusername(e.target.value)}
      ></input>
      <input
        type="password"
        className={classes.input}
        placeholder="Password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      ></input>
      <h4 className={classes.text_forget_pass}>Forget Password</h4>
      <Button
        margintop={4}
        ButtonClickHandler={ButtonClickHandler}
        text="login"
      />
      <h4 className={classes.text_forget_pass}>New User ? Sign Up Now</h4>
    </div>
  );
}

export default LeftLoginSubCard;
