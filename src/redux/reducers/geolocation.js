import { SET_LAT, SET_LONG, SET_LOCATION_DECLIED } from "../../enums/constant";
const initialState =  {lat:null, long:null,locationDeclined:null};

export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case SET_LAT:
        return {   ...state, lat: payload };
      case SET_LONG:
        return {   ...state, long: payload};
      case SET_LOCATION_DECLIED:
            return {   ...state, locationDeclined: payload};  
      default:          
        return state;
    }
  }
  
  
