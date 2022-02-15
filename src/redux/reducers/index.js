import { combineReducers } from "redux";
import auth from "./authentication";
import message from "./message";
import geoLocation from "./geolocation";

export default combineReducers({
  auth,
  message,
  geoLocation
});
