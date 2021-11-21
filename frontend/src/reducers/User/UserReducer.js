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

const initState = {
  userDataLoading: false,
  userData: {},
  error: "",
  isFavoutiteListUpdating: false,
};
export const user = (previousState, action) => {
  switch (action.type) {
    case START_USER_LOGIN:
      return {
        ...previousState,
        userDataLoading: true,
        userData: {},
      };
    case SUCCESS_USER_LOGIN:
      return {
        ...previousState,
        userDataLoading: false,
        userData: action.userData,
      };
    case ERROR_USER_LOGIN:
      return {
        ...previousState,
        userDataLoading: false,
        userData: {},
        error: action.error,
      };

    case START_USER_REGISTER:
      return {
        ...previousState,
        userDataLoading: true,
        userData: {},
      };
    case SUCCESS_USER_REGISTER:
      return {
        ...previousState,
        userData: action.userData,
        userDataLoading: false,
      };
    case ERROR_USER_REGISTER:
      return {
        ...previousState,
        userDataLoading: false,
        userData: {},
        error: action.error,
      };

    case START_GET_USER_DETAILS:
      return {
        ...previousState,
        userDataLoading: true,
        userData: {},
      };

    case SUCCESS_GET_USER_DETAILS:
      return {
        ...previousState,
        userDataLoading: false,
        userData: action.data,
      };

    case ERROR_GET_USER_DETAILS:
      return {
        ...previousState,
        userDataLoading: false,
        // userData: action.data,
      };

    case START_ADD_TO_FAVOURITE:
      return {
        isFavoutiteListUpdating: true,
        //   movieList: action.data,
      };
    case SUCCESS_ADD_TO_FAVOURITE:
      return {
        isFavoutiteListUpdating: false,
        //   movieList: action.data,
      };
    case ERROR_ADD_TO_FAVOURITE:
      return {
        isFavoutiteListUpdating: false,
        //   movieList: action.data,
      };
    default:
      return previousState || initState;
  }
};
