import React from "react";
import { makeStyles } from "@material-ui/core";
import LeftLoginSubCard from "./LeftLoginSubCard/LeftLoginSubCard";
import SignInWithSocial from "./SignInWithSocial/SignInWithSocial";

const useStyles = makeStyles(() => ({
  root: {
    padding: 0,
    margin: 0,
    position: "relative",
    top: "-5px",
    width: "500px",
    height: "290px",
    backgroundColor: "#DEF2F1",
    borderRadius: "18px",
    boxShadow: "rgba(0, 0, 0, 0.18) 0px 2px 4px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    ["@media(max-Width: 480px)"]: {
      width: "250px",
      height: "550px",
    },
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",

    alignItems: "",
    ["@media(max-Width: 480px)"]: {
      position: "center",
      flexDirection: "column",
      width: "414px",
      height: "400px",
      alignItems: "center",
    },
  },
}));

function LoginCard() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <LeftLoginSubCard />
        <SignInWithSocial />
      </div>
    </div>
  );
}

export default LoginCard;
