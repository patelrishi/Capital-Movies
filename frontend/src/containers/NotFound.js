import React from "react";
import { makeStyles } from "@material-ui/core";
import NavBar from "../components/NavBar/NavBar";

const useStyles = makeStyles((theme) => ({
  root: {
    minheight: "100vh",
    height: "100vh",
    width: "100%",
    background: `url(${process.env.PUBLIC_URL}/png/pagenotfound.gif) no-repeat center`,
    backgroundColor: "#000000",
  },
}));
const NotFound = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <NavBar />
    </div>
  );
};

export default NotFound;
