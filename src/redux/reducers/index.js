import { combineReducers } from "redux";
import auth from "./authentication";
import message from "./message";

export default combineReducers({
  auth,
  message
});
