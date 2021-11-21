import {
  ERROR_GET_TEST_DATA,
  START_GET_TEST_DATA,
  SUCESS_GET_TEST_DATA,
  START_GET_SINGLE_TEST_DATA,
  SUCESS_GET_SINGLE_TEST_DATA,
  ERROR_GET_SINGLE_TEST_DATA,
} from "../constants/TestConstants";

const initState = {
  isApiLoading: true,
  apiList: [],
  singleApiData: [],
};

const testReducer = (previousState, action) => {
  switch (action.type) {
    case START_GET_TEST_DATA:
      return {
        ...previousState,
        isApiLoading: true,
        apiList: [],
      };

    case SUCESS_GET_TEST_DATA:
      return {
        ...previousState,
        isApiLoading: false,
        apiList: action.apiList,
      };

    case ERROR_GET_TEST_DATA:
      return {
        ...previousState,
        isApiLoading: false,
        apiList: action.apiList,
      };

    case START_GET_SINGLE_TEST_DATA:
      return {
        ...previousState,
        isApiLoading: false,
        singleApiData: [],
      };

    case SUCESS_GET_SINGLE_TEST_DATA:
      return {
        ...previousState,
        isApiLoading: false,
        singleApiData: action.payload,
      };

    case ERROR_GET_SINGLE_TEST_DATA:
      return {
        ...previousState,
        isApiLoading: false,
        singleApiData: action.apiList,
      };
    default:
      return previousState || initState;
  }
};

export default testReducer;
