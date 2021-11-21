import axios from "axios";

export async function getMovieList(type) {
  if (type === "") {
    const { data } = await axios.get(
      `${process.env.REACT_APP_THE_MOVIE_DB_URL}`
    );
    return data;
  } else if (type === "latest") {
    const { data } = await axios.get(
      `${process.env.REACT_APP_THE_MOVIE_DB_URL}&sort_by=release_date.dsc`
    );
    return data;
  } else if (type === "popular") {
    const { data } = await axios.get(
      `${process.env.REACT_APP_THE_MOVIE_DB_URL}&sort_by=popularity.desc`
    );
    return data;
  }
}
