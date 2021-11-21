import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import "./card.css";
import { connect } from "react-redux";
import { START_ADD_TO_FAVOURITE } from "../../constants/MovieConstants";
const useStyles = makeStyles((theme) => ({
  capitalMovieCardRoot: {
    margin: 10,
  },
}));
const MovieCard = ({ addTofavourite, user, elem }) => {
  const classes = useStyles();

  const addMovieToFavourite = () => {
    if (Object?.keys(user)?.length !== 0) {
      if (
        Boolean(user?.watchList.filter((e) => e.id === elem.id).length === 0)
      ) {
        addTofavourite({
          _id: user._id,
          data: elem,
        });
      }
    } else {
      window.location.href = "/auth";
    }
  };
  return (
    <div className={classes.capitalMovieCardRoot}>
      <div class="ui-card">
        <img src={`https://image.tmdb.org/t/p/w500/${elem?.poster_path}`} />
        <div class="description">
          <h3>{elem?.title}</h3>
          <Typography variant="p" component="p" gutterBottom>
            Released on {elem?.release_date}
          </Typography>
          <Typography variant="p" component="p" gutterBottom>
            Rating ⭐{elem?.vote_average}
          </Typography>
          <Typography variant="p" component="p" gutterBottom wrap>
            {elem?.overview?.split("", 120)}...
          </Typography>
          <a href="#" onClick={() => addMovieToFavourite()}>
            Add to Wishlist
          </a>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.userData,
});

const mapDispatchToProps = (dispatch) => ({
  addTofavourite: (data) =>
    dispatch({
      type: START_ADD_TO_FAVOURITE,
      data,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);
