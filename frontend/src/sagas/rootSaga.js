import React from "react";
import { all } from "redux-saga/effects";
import { movieDataWatcher } from "./Movie/MovieSaga";
import { singleTestApiWatcher, testApiWatcher } from "./testSaga";
import {
  addToFavouriteWatcher,
  userDetailsWatcher,
  userLoginWatcher,
  userRegisterWatcher,
} from "./user/UserSaga";

export default function* rootSaga() {
  yield all([
    // testApiWatcher(),
    // singleTestApiWatcher(),
    userLoginWatcher(),
    userRegisterWatcher(),
    userDetailsWatcher(),
    movieDataWatcher(),
    addToFavouriteWatcher(),
  ]);
}
