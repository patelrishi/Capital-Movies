import { call, put, select, take, takeEvery } from "redux-saga/effects";
import { TestAction, TestProduct } from "../Actions/TestAction";
import {
  ERROR_GET_TEST_DATA,
  START_GET_TEST_DATA,
  SUCESS_GET_TEST_DATA,
  START_GET_SINGLE_TEST_DATA,
  SUCESS_GET_SINGLE_TEST_DATA,
  ERROR_GET_SINGLE_TEST_DATA,
} from "../constants/TestConstants";

function* testApiWorker(params) {
  const response = yield call(TestAction);
  try {
    if (response !== undefined) {
      yield put({
        type: SUCESS_GET_TEST_DATA,
        apiList: response,
      });
    } else {
      yield put({
        type: ERROR_GET_TEST_DATA,
        apiList: response,
      });
    }
  } catch (error) {}
}
export function* testApiWatcher() {
  yield takeEvery(START_GET_TEST_DATA, testApiWorker);
}

function* singleTestApiWorker({ id }) {
  const pid = id;
  const response = yield call(TestProduct, pid);

  try {
    if (response !== undefined) {
      yield put({
        type: SUCESS_GET_SINGLE_TEST_DATA,
        payload: response,
      });
    } else {
      yield put({
        type: ERROR_GET_SINGLE_TEST_DATA,
        payload: response,
      });
    }
  } catch (error) {}
}
export function* singleTestApiWatcher() {
  yield takeEvery(START_GET_SINGLE_TEST_DATA, singleTestApiWorker);
}
