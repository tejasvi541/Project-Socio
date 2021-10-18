import React from 'react';
import { makeStyles } from '@material-ui/core';
import Login from '../Login/Login';
import Footer from '../../Components/Footer/Footer';

const useStyles = makeStyles(() => ({
  root: {},
}));

function Home(props) {
  console.log(props);
  const classes = useStyles();
  return (
    <div>
      <Login in={props.in} up={props.up} />
      <Footer />
    </div>
  );
}

export default Home;
