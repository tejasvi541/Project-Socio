import React from "react";
import { makeStyles } from "@material-ui/core";
import Button from "../../Button/Button";
import GoogleIcon from "./../../../assets/icons/google-icon.svg";
import LinkdinIcon from "./../../../assets/icons/linkedin-icon.svg";
import GitHubIconNew from "./../../../assets/icons/github-white.svg";

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
}));

function SignInWithSocial() {
  const classes = useStyles();

  const GithubClikced = () => {
    console.log("Github Clicked !");
  };

  const GoogleClikced = () => {
    console.log("Google Clicked !");
  };

  const LinkdinClikced = () => {
    console.log("Linkdin Clicked !");
  };

  return (
    <div className={classes.root}>
      <h4 className={classes.text}>Sign In With Social Accounts</h4>
      <Button
        image
        imageurl={GitHubIconNew}
        width="80%"
        height={30}
        margintop={16}
        fontSize={13}
        fontWeight={500}
        text="Github"
        ButtonClickHandler={GithubClikced}
      />
      <Button
        image
        imageurl={GoogleIcon}
        width="80%"
        height={30}
        margintop={16}
        fontSize={13}
        fontWeight={500}
        text="Google"
        ButtonClickHandler={GoogleClikced}
      />
      <Button
        image
        imageurl={LinkdinIcon}
        width="80%"
        margintop={16}
        height={30}
        fontSize={13}
        fontWeight={500}
        text="Linkdin"
        ButtonClickHandler={LinkdinClikced}
      />
    </div>
  );
}

export default SignInWithSocial;
