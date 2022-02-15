import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import validator from 'validator'
import { clearMessage } from "../actions/message"

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { authLogin } from "../actions/authentication";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
   
  
} from "react-router-dom";

const required = (value) => {
  if (!value) {
    return requiredField();
  }
}
  
const emailRequired = (value) => {
  if (!value) {
    return requiredField();
  }
  else{
    if (!validator.isEmail(value)) {    
      return invalidEmail();
    } 
  }
};

function invalidEmail(){
  return (       
      <div className="alert alert-danger" role="alert">
        Email is not valid
      </div>
    );
}


function requiredField(){
  return (       
    <div className="alert alert-danger" role="alert">
    This field is required!
    </div>
    );
}

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
//   const [isAWorker, setIsAWorker] = useState(false);
  

  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();

  const onChangeEmail = (e) => {
    const email = e.target.value;    
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {   
    e.preventDefault();   
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      setLoading(true);
      dispatch(authLogin(email, password))
        .then(() => {
          props.history.push("/home");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="col-md-12 login-container container tc pa4 min-vh-100">
      <div className="card card-container ">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <Input
              type="text"
              className="form-control"
              name="email"
              value={email}
              onChange={onChangeEmail}
              validations={[emailRequired]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="button">
            <button className="primary " disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          <div className="notmember">
                <span className="">Not a Member?</span>
                <Link to={"/register"} className="navbar-brand">
                Register</Link> 
          </div>


          {/* <div className="form-group"> */}
          {/* <label htmlFor="Worker">Password</label> */}
            {/* <CheckButton ref={isAWorker} > */}

            {/* </CheckButton> */}
          {/* </div> */}

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
           
          { <CheckButton style={{ display: "none" }} ref={checkBtn} /> }
        </Form>
      </div>
    </div>
  );
};

export default Login;
