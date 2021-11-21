import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import TextFieldPurple from "../common/TextField/TextField";
import { connect } from "react-redux";
import { START_USER_LOGIN } from "../../constants/UserConstants";
import { withRouter } from "react-router";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  signinRoot: {
    boxShadow: "0px 2px 4px rgb(16 7 33 / 12%)",
    height: "fit-content",
    maxWidth: 330,
    minHeight: 400,
    margin: "auto",
    background: "rgba(0,0,0,0.7)",
  },
  signinFornm: {
    padding: "60px 20px",
    "&>div": {
      marginBottom: 16,
    },
    "&>button": {
      display: "flex",
      margin: "30px auto 0 auto",
      height: 40,
      width: 150,
      "&>span": {
        color: "#e50914",
      },
    },
    "&>h4": {
      textAlign: "center",
      fontWeight: 600,
      color: "#e50914",
      marginBottom: 40,
    },
    "&>h6": {
      // fontWeight: 600,
      fontSize: 14,
      color: "#e50914",
    },
  },
  SigninBottomText: {
    color: "#808080 !important",
    textAlign: "center",
    "&>span": {
      color: "#e50914",
      cursor: "pointer",
    },
  },
}));
const Signin = ({ setCurrentTab, login, user, userDataLoading, error }) => {
  const classes = useStyles();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let dataError = 0;

    if (email === "") {
      dataError = 1;
      setEmailError("Please enter the email");
    }

    // passwordValidator;
    if (password === "") {
      dataError = 1;
      setPasswordError("Please enter the Passwod");
    }
    // check box validator

    if (dataError === 0) {
      login(email, password);
    }
  };

  useEffect(() => {
    if (
      window.localStorage.getItem("token") !== null &&
      window.localStorage.getItem("token") !== undefined
    ) {
      window.location.href = "/discover";
    }
  }, [user, userDataLoading]);

  useEffect(() => {
    if (error && userDataLoading === false) {
      setServerError(error);
    } else {
      setServerError("");
    }
  }, [userDataLoading]);
  return (
    <div className={classes.signinRoot}>
      <div className={classes.signinFornm}>
        <Typography variant="h4" component="h4" gutterBottom>
          Sign In
        </Typography>
        <Typography variant="h6" component="h6" gutterBottom>
          {emailError}
        </Typography>

        <TextFieldPurple
          placeholder="Email"
          onChange={(e) => {
            setEmailError("");
            setemail(e.target.value);
          }}
          value={email}
        />
        <Typography variant="h6" component="h6" gutterBottom>
          {passwordError}
        </Typography>
        <TextFieldPurple
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPasswordError("");
            setpassword(e.target.value);
          }}
        />
        <Typography variant="h6" component="h6" gutterBottom>
          {serverError}
        </Typography>
        <Button
          startIcon={
            userDataLoading && <CircularProgress size={15} color="#e50914" />
          }
          onClick={(e) => handleSubmit(e)}
        >
          Get Started
        </Button>
        <Typography
          className={classes.SigninBottomText}
          variant="caption"
          component="p"
          gutterBottom
        >
          New Here?{" "}
          <span
            onClick={() => {
              setServerError("");
              setCurrentTab("signup");
            }}
          >
            Sign up
          </span>
        </Typography>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  user: state.user.userData,
  userDataLoading: state.user.userDataLoading,
  error: state.user.error,
});

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) =>
    dispatch({ type: START_USER_LOGIN, email, password }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signin));

// export default Signin;
