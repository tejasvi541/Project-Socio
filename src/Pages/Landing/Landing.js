import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import Button from "../../Components/Button/Button";
import back from "../../img/showcase.jpg";
import { Link, Redirect } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    overflow: "hidden",
    backgroundImage: `url(${back})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    alignItems: "center",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    fontSize: "75px",
    fontWeight: "950",
    position: "absolute",
    marginTop: "200px",

    alignContent: "center",
    color: "#5CDB95",
  },
  buttonWapper: {
    display: "flex",

    padding: "20px 0px",
  },
  routerLink: {
    textDecoration: "None",
    margin: "10px",
  },
}));

const Landing = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1 className={classes.heading}>Welcome to Project-Socio</h1>
      <div className={classes.buttonWapper}>
        <Link to="/signin" className={classes.routerLink}>
          <Button
            margintop={325}
            fontWeight={700}
            margin={4}
            fontSize={15}
            height={100}
            height={50}
            width={150}
            text="Login"
          />
        </Link>
        <Link to="/signup" className={classes.routerLink}>
          <Button
            margintop={325}
            fontWeight={700}
            margin={4}
            fontSize={15}
            height={50}
            width={150}
            text="Register"
          />
        </Link>
      </div>
    </div>
  );
};

export default Landing;
