import React, { useEffect, useState } from "react";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import MovieCard from "../MovieCards/MovieCard";
import TeamCardCarousel from "../carousel/MovieCarousel";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  capitalDashboardRoot: {
    // minHeight: "calc(100vh - 72px)",
    height: "calc(100vh - 72px)",
    overflowY: "auto",
    backgroundColor: "#171717",
    "&>div": {
      height: "fit-content",
      background: `url(${process.env.PUBLIC_URL}/png/background.jpg)`,
    },
  },
  capitalMovieTop: {
    backdropFilter: "blur(10px)",
    height: "400px",
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    "&>div": {
      "&>h3": {
        // color: "#FFFFFF",
        color: "#e50914",
        fontWeight: 600,
        [theme.breakpoints.down("sm")]: {
          display: "none",
        },
      },
    },
  },
  capitalMovieBottom: {
    backgroundColor: "#171717",
    height: "100vh",
    width: "100%",

    "&>div": {
      padding: "20px 10px",
      display: "flex",
      flexWrap: "wrap",
      // justifyContent: "space-evenly",
      "&>div": {
        maxWidth: 300,
        [theme.breakpoints.down("sm")]: {
          maxWidth: "none",
        },
        "&>div>div": {
          borderRadius: 0,
          width: "100%",
          // maxWidth: 300,
          height: 380,
          margin: "10px 5px",
          border: "6px solid #e50914",
          // border: "6px solid #75c74e",
        },
      },
    },
    "&>h5": {
      color: "#e50914",
      padding: "30px 30px 0",
      fontWeight: 600,
    },
  },
  blankState: {
    width: "100% !important",
    maxWidth: "none !important",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "&>h2": {
      color: "#FFFFFF",
      fontWeight: 600,
    },
  },
}));
const Dashboard = ({
  movieList,
  currentTab,
  getMovieData,
  user,
  setCurrentTab,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const [movies, setMovies] = useState(user?.watchList);

  useEffect(() => {
    if (currentTab === "discover") {
      history.replace(`/discover`);
      getMovieData("");
    } else if (currentTab === "popular") {
      history.replace(`/discover/popular`);
      getMovieData("popular");
    } else if (currentTab === "latest") {
      history.replace(`/discover/latest`);
      getMovieData("latest");
    } else if (currentTab === "favourites") {
      history.replace(`/discover/favourites`);
      setMovies(user?.watchList);
    }
  }, [currentTab, window.location.pathname]);

  useEffect(() => {
    if (currentTab !== "favourites" && movieList?.length > 0) {
      setMovies(movieList);
    } else {
      setMovies(user?.watchList);
    }
  }, [movieList, currentTab]);

  return (
    <Grid className={classes.capitalDashboardRoot}>
      <Grid>
        <Grid className={classes.capitalMovieTop}>
          <Grid sm={3}>
            <Typography variant="h3" component="h3" gutterBottom>
              Newly {currentTab}
            </Typography>
          </Grid>

          <Grid xs={12} sm={12} md={4}>
            {currentTab !== "favourites" && movies ? (
              <TeamCardCarousel movieList={movies} />
            ) : (
              <TeamCardCarousel movieList={user?.watchList} />
            )}
          </Grid>
        </Grid>
        <Grid className={classes.capitalMovieBottom}>
          <Typography variant="h5" component="h5" gutterBottom>
            Featured
          </Typography>
          <Grid container>
            {currentTab !== "favourites" ? (
              movies?.map((elem, i) => (
                <Grid xs={12} sm={6} md={4} lg={4}>
                  <MovieCard elem={elem} />
                </Grid>
              ))
            ) : user?.watchList?.length > 0 ? (
              user?.watchList?.map((elem, i) => (
                <Grid xs={12} sm={6} md={4} lg={4}>
                  <MovieCard elem={elem} />
                </Grid>
              ))
            ) : (
              <div className={classes.blankState}>
                <Typography variant="h2" component="h2" gutterBottom>
                  No Movies Found
                </Typography>
                <img
                  src={`${process.env.PUBLIC_URL}/png/noMovies.jpg`}
                  alt="*"
                />
              </div>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
