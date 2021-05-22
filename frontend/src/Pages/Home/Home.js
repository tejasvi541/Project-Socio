import React from 'react';
import { makeStyles } from '@material-ui/core';
import Login from '../Login/Login';
import Footer from '../../Components/Footer/Footer';

const useStyles = makeStyles(() => ({
  root: {},
}));

function Home() {
  const classes = useStyles();
  return (
    <div>
      <Login />
      <Footer />
    </div>
  );
}

export default Home;
