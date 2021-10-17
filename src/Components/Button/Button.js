import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((props) => ({
  root: {
    marginTop: (props) => props.margintop,
    padding: 1,
    margin: 2,
    width: (props) => (props.width ? props.width : "125px"),
    height: (props) => (props.height ? props.height : "28px"),
    fontWeight: "700",
    borderRadius: "18px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "rgba(23, 37, 42, 1)",
    "&:hover": {
      cursor: "pointer",
      boxShadow: "rgba(0, 0, 0, 0.18) 0px 2px 4px",
      transition: "all 0.2s ease-out",
      transform: "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0.96)",
    },
    ["@media(max-Width: 480px)"]: {
      width: "110% !important",
    },
  },
  btn_text: {
    fontFamily: "Droid Sans",
    fontSize: (props) => (props.fontSize ? props.fontSize : "11"),
    fontWeight: (props) => (props.fontWeight ? props.fontWeight : "100"),
    color: "white",
  },
  img: {
    width: "22px",
    height: "22px",
    backgroundColor: "rgba(23, 37, 42, 1)",
    // borderRadius: '22px',
  },
}));

function Button(props) {
  const classes = useStyles(props);
  return (
    <div className={classes.root} onClick={props.ButtonClickHandler}>
      {props.image ? (
        <img src={props.imageurl} className={classes.img} alt="logo" />
      ) : null}
      <h6 className={classes.btn_text}>{props.text}</h6>
    </div>
  );
}

export default Button;
