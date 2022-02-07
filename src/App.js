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
//import {  Router, Routes, Route, Link } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
   
  
} from "react-router-dom";


//import Register from "./components/Register";

//import Profile from "./components/Profile";
//import WorkEnquiry from "./components/WorkEnquiry";
//import ModSiteReview from "./components/ModSiteReview";
//import SiteReview from "./components/SiteReview";



// import AuthVerify from "./common/AuthVerify";


export const App = () => {
  // const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  // const [showAdminBoard, setShowAdminBoard] = useState(false);

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
    // if (currentUser) {
      // setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      // setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    // } else {
      // setShowModeratorBoard(false);
      // setShowAdminBoard(false);
    // }

    events.on("logout", () => {
      logOut();
    });

    return () => {
      events.remove("logout");
    };
  }, [currentUser, logOut]);
function getsomething(){
  alert('test')
}
  return (      
    <div>  
      
   
    <Router>
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

        <footer className="footer-container">
          <p>
            Project <i class="fa "></i> by Harish Janardhanan 
          </p>
        </footer>
      </div>
    </Router>      
      
    </div>
  )
};

