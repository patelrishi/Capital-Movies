import {
  ERROR_FETCH_MOVIE_DATA,
  START_ADD_TO_FAVOURITE,
  START_FETCH_MOVIE_DATA,
  SUCCESS_ADD_TO_FAVOURITE,
  SUCCESS_FETCH_MOVIE_DATA,
} from "../../constants/MovieConstants";

const initState = {
  movieList: [],
  isMovieAPiLoading: false,
  isFavoutiteListUpdating: false,
};

export const Movies = (previousState, action) => {
  switch (action.type) {
    case START_FETCH_MOVIE_DATA:
      return {
        isMovieAPiLoading: true,
        movieList: [],
      };

    case SUCCESS_FETCH_MOVIE_DATA:
      return {
        isMovieAPiLoading: false,
        movieList: action.data,
      };
    case ERROR_FETCH_MOVIE_DATA:
      return {
        isMovieAPiLoading: false,
        //   movieList: action.data,
      };

    default:
      return previousState || initState;
  }
};
