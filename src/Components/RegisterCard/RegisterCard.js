import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Button from "../Button/Button.js";

const useStyles = makeStyles(() => ({
  root: {
    margin: "1rem",
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    width: "100%",
    fontFamily: "Droid Sans",
    fontWeight: "Regular",
    fontSize: 13,
    textAlign: "center",
  },
  input: {
    fontFamily: "Droid Sans",
    fontSize: 12,
    textAlign: "center",
    width: "130%",
    marginTop: 6,
    marginBottom: 6,
    height: "30px",
    borderStyle: "none",
    borderRadius: "16px",
    backgroundColor: "rgba(23, 37, 42, 1)",
    color: "white",
    "&:focus": {
      outline: "none",
    },
    ["@media(max-Width: 480px)"]: {
      width: "110%",
    },
  },
  text_forget_pass: {
    margin: 0,
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    width: "100%",
    fontFamily: "Droid Sans",
    fontWeight: "regular",
    fontSize: 11,
    textAlign: "center",
    "&:hover": {
      cursor: "pointer",
      color: "#334443",
    },
  },
}));

function RegisterCard() {
  const classes = useStyles();
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");

  const ButtonClickHandler = () => {
    console.log(username + password + email + confirmpassword);
  };
  return (
    <div className={classes.root}>
      <h4 className={classes.text}>Sign Up Here</h4>
      <input
        type="text"
        className={classes.input}
        placeholder="Username"
        value={username}
        onChange={(e) => setusername(e.target.value)}
      ></input>
      <input
        type="text"
        className={classes.input}
        placeholder="Email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
      ></input>
      <input
        type="password"
        className={classes.input}
        placeholder="Password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      ></input>
      <input
        type="password"
        className={classes.input}
        placeholder="Confirm Password"
        value={confirmpassword}
        onChange={(e) => setconfirmpassword(e.target.value)}
      ></input>
      <Button
        margintop={4}
        ButtonClickHandler={ButtonClickHandler}
        fontWeight={700}
        text="Register"
      />
      <h4 className={classes.text_forget_pass}>Already a User ? Sign In</h4>
    </div>
  );
}

export default RegisterCard;
