import { Button, Grid, makeStyles, withStyles } from "@material-ui/core";
import classNames from "classnames";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Dashboard from "../components/Dashborad/Dashboard";
import NavBar from "../components/NavBar/NavBar";
import { START_FETCH_MOVIE_DATA } from "../constants/MovieConstants";
import {
  START_GET_SINGLE_TEST_DATA,
  START_GET_TEST_DATA,
} from "../constants/TestConstants";
import { START_GET_USER_DETAILS } from "../constants/UserConstants";

const styles = (theme) => ({
  capitalRoot: {
    height: "100vh",
    overflow: "auto",
  },
});

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: "",
    };
  }

  setCurrentTab = (tab) => {
    this.setState({
      currentTab: tab,
    });
  };

  componentDidMount() {
    const {
      getUserData,
      user,
      getMovieData,
      currentTab,
      history,
      setCurrentTab,
    } = this.props;
    if (window.localStorage.getItem("userInfo") !== null) {
      getUserData(window.localStorage.getItem("userInfo"));
    }
    if (window.location.pathname.split("/").at(-1) === "discover") {
      this.setState({
        currentTab: "discover",
      });
    }
    if (window.location.pathname.split("/").at(-1) === "popular") {
      this.setState({
        currentTab: "popular",
      });
    }
    if (window.location.pathname.split("/").at(-1) === "latest") {
      this.setState({
        currentTab: "latest",
      });
    }
    if (window.location.pathname.split("/").at(-1) === "favourites") {
      this.setState({
        currentTab: "favourites",
      });
    }
    if (window.location.pathname.split("/").at(-1) === "") {
      history.replace(`/discover`);
      this.setState({
        currentTab: "discover",
      });
    }
    getMovieData();
  }

  render() {
    const { classes, movieList, getMovieData, user } = this.props;

    return (
      <Grid className={classes.capitalroot}>
        <NavBar
          setCurrentTab={this.setCurrentTab}
          currentTab={this.state.currentTab}
          user={user}
        />
        <Dashboard
          movieList={movieList}
          currentTab={this.state.currentTab}
          setCurrentTab={this.setCurrentTab}
          getMovieData={getMovieData}
          user={user}
        />
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  // isApiLoading: state.testReducer.isApiLoading,
  // apilist: state.testReducer.apiList,
  user: state.user.userData,
  userDataLoading: state.user.userDataLoading,
  movieList: state.Movies.movieList,
});
const mapDispatchToProps = (dispatch) => ({
  getApiData: () =>
    dispatch({
      type: START_GET_TEST_DATA,
    }),
  getUserData: (id) =>
    dispatch({
      type: START_GET_USER_DETAILS,
      id,
    }),
  getMovieData: (tab) =>
    dispatch({
      type: START_FETCH_MOVIE_DATA,
      tab,
    }),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DashBoard))
);
