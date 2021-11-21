import { combineReducers } from "redux";
import testReducer from "./testReducer";
import { user } from "./User/UserReducer";
import { Movies } from "./Movie/MovieReducers";
export default combineReducers({ testReducer, user, Movies });
