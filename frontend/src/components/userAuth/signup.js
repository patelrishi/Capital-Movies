import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import TextFieldPurple from "../common/TextField/TextField";
import { connect } from "react-redux";
import { START_USER_REGISTER } from "../../constants/UserConstants";
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
const Signup = ({ setCurrentTab, Register, user, userDataLoading, error }) => {
  const classes = useStyles();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let dataError = 0;

    if (name === "") {
      dataError = 1;
      setNameError("please enter the name");
    }

    // email validator
    if (email === "") {
      setEmailError("Please enter a email address");
      dataError = 1;
    } else {
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!emailRegex.test(email)) {
        dataError = 1;
        setEmailError("Please enter a valid email address");
      }
    }

    // passwordValidator;
    if (password === "") {
      dataError = 1;
      setPasswordError("Please enter the Passwod");
    } else if (password.length < 8) {
      dataError = 1;
      setPasswordError("Password length should be at least 8 char");
    }

    if (password !== confirmPassword) {
      dataError = 1;
      setPasswordError("password not match");
    }

    if (dataError === 0) {
      Register(name, email, password);
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
    if (error) {
      setServerError(error);
    } else {
      setServerError("");
    }
  }, [error, userDataLoading]);
  return (
    <div className={classes.signinRoot}>
      <div className={classes.signinFornm}>
        <Typography variant="h4" component="h4" gutterBottom>
          Register
        </Typography>
        <Typography variant="h6" component="h6" gutterBottom>
          {nameError}
        </Typography>
        <TextFieldPurple
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setNameError("");
            setname(e.target.value);
          }}
        />
        <Typography variant="h6" component="h6" gutterBottom>
          {emailError}
        </Typography>
        <TextFieldPurple
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmailError("");
            setemail(e.target.value);
          }}
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
        <TextFieldPurple
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setPasswordError("");
            setconfirmPassword(e.target.value);
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
          Already member?{" "}
          <span
            onClick={() => {
              setServerError("");
              setCurrentTab("login");
            }}
          >
            Sign in
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
  Register: (name, email, password) =>
    dispatch({ type: START_USER_REGISTER, name, email, password }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
