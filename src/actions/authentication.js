import {
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    SET_MESSAGE,
  } from "../enums/constant";
  
  import { registerHelpFinderUSer,
    signin,
    registerAsWorker,
    logout} from "../services/authService";
  
  export const authRegister = (email, password, firstName, lastName, address) => (dispatch) => {
    return registerHelpFinderUSer( email, password, firstName, lastName, address).then(
      (response) => {
        dispatch({
          type: USER_REGISTER_SUCCESS,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: USER_REGISTER_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  
  export const authLogin = (email, password) => (dispatch) => {
    return signin(email, password).then(
      (data) => {
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: { user: data },
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: USER_LOGIN_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  
  export const authLogout = () => (dispatch) => {
    logout();
  
    dispatch({
      type: USER_LOGOUT,
    });
  };
  