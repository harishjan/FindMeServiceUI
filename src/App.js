import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/index.scss"
import React, { useState, useEffect, useCallback , Fragment } from "react";
import { Button, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import Login from "./compnents/login"
import Home from "./compnents/home"
import Profile from "./compnents/profiles/profile"
import Register from "./compnents/register"
import { authLogin, authLogout } from "./actions/authentication"
import { clearMessage } from "./actions/message"
import { history } from "./actions/history"
import events from "./helper/events"
import {
  BrowserRouter as Router,
  Routes, 
  Route,
  Link
   
  
} from "react-router-dom";
import HeaderNavBar from "./compnents/navbar"
import { SET_LAT, SET_LOCATION_DECLIED, SET_LONG, SET_MESSAGE } from './enums/constant';

export const App = (props) => {  

  const { user: currentUser } = useSelector((state) => state.auth);  
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  const logOut = useCallback(() => {
    dispatch(authLogout());
  }, [dispatch]);

  useEffect(() => {  
    events.on("logout", () => {
      logOut();
    });

    return () => {
      events.remove("logout");
    };
  }, [currentUser, logOut]);

  useEffect(()=>{

    if (navigator.geolocation) {

      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {            
            navigator.geolocation.getCurrentPosition((m) => {
              dispatch({
                type: SET_LAT,
                payload: m.coords.latitude,
              })
              dispatch({
                type: SET_LONG,
                payload: m.coords.longitude,
              })
            });
            dispatch({
              type: SET_LOCATION_DECLIED,
              payload: false,
            })
            //If granted then you can directly call your function here
          } else if (result.state === "prompt") {

          } else if (result.state === "denied") {        
            dispatch({
              type: SET_LOCATION_DECLIED,
              payload: true,
            })
          }
          result.onchange = function () {
            
          };
        });
    } else {
      dispatch({
        type: SET_LOCATION_DECLIED,
        payload: true,
      })
      alert("Sorry Not available!");
    }
  
  },[]);
  return (      
    <div>  
    
    <Router>
      
      <Fragment>
        <HeaderNavBar />   
        <Routes>                
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/home' element={<Home/>}/>
        <Route exact path='/login' element={<Login props={props}/>}/>
        <Route exact path='/profile' element={<Profile props={props}/>}/>
        <Route exact path='/register' element={<Register props={props}/>}/>              
        </Routes>        
      </Fragment>
    </Router>
   {/* <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark header-container">
          <Link to={"/home"} className="navbar-brand">
            Help Finder
          </Link>          
       
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.email}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                 Profiles
                </Link>
              </li>
            </div>

          )}
        </nav>

        <div className="container mt-3">
          <Fragment>
            <Navbar/>
            <Routes>        
            <Route exact path='/' element={<Home/>}/>
              <Route exact path='/home' element={<Home/>}/>
              <Route exact path='/login' element={<Login/>}/>
              <Route exact path='/profile' element={<Profile/>}/>
              <Route exact path='/register' element={<Register/>}/>              
            </Routes>
          </Fragment>
        </div>

      </div>
    </Router>      
       */}

       
      <footer className="footer-container">
          <p>
            Project <i class="fa "></i> by Harish Janardhanan 
          </p>
        </footer>
    </div>
  )
};

