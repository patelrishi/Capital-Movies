import { call, put, takeEvery } from "redux-saga/effects";
import { getMovieList } from "../../API/MovieAPi";
import {
  ERROR_FETCH_MOVIE_DATA,
  START_FETCH_MOVIE_DATA,
  SUCCESS_FETCH_MOVIE_DATA,
} from "../../constants/MovieConstants";

function* movieDatWorker({ tab }) {
  const response = yield call(getMovieList, tab);

  try {
    if (response.results) {
      yield put({ type: SUCCESS_FETCH_MOVIE_DATA, data: response.results });
    } else {
      yield put({ type: ERROR_FETCH_MOVIE_DATA });
    }
  } catch (error) {
    yield put({ type: ERROR_FETCH_MOVIE_DATA });
  }
}
export function* movieDataWatcher() {
  yield takeEvery(START_FETCH_MOVIE_DATA, movieDatWorker);
}
