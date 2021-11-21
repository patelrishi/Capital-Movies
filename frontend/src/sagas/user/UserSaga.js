import { call, put, takeEvery } from "redux-saga/effects";
import {
  addToFavourite,
  getUserDetails,
  userLogin,
  userRegister,
} from "../../API/UserApi";
import {
  ERROR_ADD_TO_FAVOURITE,
  START_ADD_TO_FAVOURITE,
  SUCCESS_ADD_TO_FAVOURITE,
} from "../../constants/MovieConstants";
import {
  ERROR_GET_USER_DETAILS,
  ERROR_USER_LOGIN,
  ERROR_USER_REGISTER,
  START_GET_USER_DETAILS,
  START_USER_LOGIN,
  START_USER_REGISTER,
  SUCCESS_GET_USER_DETAILS,
  SUCCESS_USER_LOGIN,
  SUCCESS_USER_REGISTER,
} from "../../constants/UserConstants";

function* userLoginWorker({ email, password }) {
  const response = yield call(userLogin, email, password);

  try {
    if (response !== undefined) {
      if (response.message) {
        yield put({
          type: ERROR_USER_LOGIN,
          error: response.message,
        });
      } else {
        yield put({ type: SUCCESS_USER_LOGIN, userData: response });
        localStorage.setItem("userInfo", response._id);
        localStorage.setItem("token", response.token);
      }
    } else {
      yield put({
        type: ERROR_USER_LOGIN,
      });
    }
  } catch (error) {
    yield put({
      type: ERROR_USER_LOGIN,
    });
  }
}
export function* userLoginWatcher() {
  yield takeEvery(START_USER_LOGIN, userLoginWorker);
}

function* userRegisterWorker({ name, email, password }) {
  const response = yield call(userRegister, name, email, password);
  try {
    if (response !== undefined) {
      if (response.message) {
        yield put({
          type: ERROR_USER_REGISTER,
          error: response.message,
        });
      } else {
        yield put({ type: SUCCESS_USER_REGISTER, userData: response });
        localStorage.setItem("userInfo", response._id);
        localStorage.setItem("token", response.token);
      }
    } else {
      yield put({
        type: ERROR_USER_REGISTER,
      });
    }
  } catch (error) {
    yield put({
      type: ERROR_USER_REGISTER,
    });
  }
}
export function* userRegisterWatcher() {
  yield takeEvery(START_USER_REGISTER, userRegisterWorker);
}

export function* userDetailsWorker({ id }) {
  const response = yield call(getUserDetails, id);
  try {
    if (response !== undefined) {
      yield put({ type: SUCCESS_GET_USER_DETAILS, data: response });
    } else {
      yield put({ type: ERROR_GET_USER_DETAILS });
    }
  } catch (error) {
    yield put({ type: ERROR_GET_USER_DETAILS });
  }
}

export function* userDetailsWatcher() {
  yield takeEvery(START_GET_USER_DETAILS, userDetailsWorker);
}

export function* addToFavouriteWorker({ data }) {
  const response = yield call(addToFavourite, data);
  try {
    if (response !== undefined) {
      yield put({ type: SUCCESS_ADD_TO_FAVOURITE });
      yield put({ type: SUCCESS_GET_USER_DETAILS, data: response });
    } else {
      yield put({ type: ERROR_ADD_TO_FAVOURITE });
    }
  } catch (error) {
    yield put({ type: ERROR_ADD_TO_FAVOURITE });
  }
}

export function* addToFavouriteWatcher() {
  yield takeEvery(START_ADD_TO_FAVOURITE, addToFavouriteWorker);
}
