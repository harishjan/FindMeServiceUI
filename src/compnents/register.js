import React, { useState, useRef, useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import validator from 'validator'
import { clearMessage, setMessage  } from "../actions/message"
//import AutoComplete from "react-google-autocomplete";

//import { Input, List } from "antd";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import textarea from "react-validation/build/textarea";
import { authLogin } from "../actions/authentication";
//import CheckButton from 'react-autosuggest'
//import CheckButton from 'autosuggest-highlight'
import Autocomplete from "./Search/GoogleAddressAutoComplete";
import ToggleButton from "react-toggle-button";
import { WithContext as ReactTags } from 'react-tag-input';
import skillTags from "../static/skills"
import {registerAsWorker, registerHelpFinderUSer} from "../services/authService"
import { history } from "../actions/history";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
   
  
} from "react-router-dom";
import { SET_MESSAGE } from "../enums/constant";


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

const passwordRequired = (value) => {
    var re = {
        'capital' : /[A-Z]/,
        'digit'   : /[0-9]/,
        'except'  : /[aeiou]/,
        'full'    : /^[@#][A-Za-z0-9]{7,15}$/
    };
    var reg = { 'pwd' : /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{7,20}$/};
    if(!reg.pwd.test(value)) {
        return (       
            <div className="alert alert-danger" role="alert">
            Password should be 7 to 20 in length, with one lower case, upper case char and  one number and special character
            </div>
        );
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

const Register = (props) => {
    const form = useRef();
    const checkBtn = useRef();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);
    
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");    
    const [desc, setDesc] = useState("");
    const [skills, setSkills] = useState([]);    
    const [address, setAdddress] = useState("");
    const [workUser, setWorkUser] = useState(false);
    //const [skillTags, setSkillTags] = useState(skills);
    
    const onChangeFirstName = (e) => {
        const fristName = e.target.value;    
        setFirstName(fristName);
    };
    const onChangeLastName = (e) => {
        const lastName = e.target.value;    
        setLastName(lastName);
    };
    const onChangeAddress = (e) => {
        const ddress = e.target.value;    
        setAddress(address);
    };

    const onChangeDesc = (e) => {
        const desc = e.target.value;    
        setDesc(desc);
    };

    const onChangeSkills = (e) => {
        const skills = e.target.value;    
        setSkills(skills);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;    
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleRegister = (e) => {   
        dispatch(clearMessage());       
        e.preventDefault()  
        form.current.validateAll();        
        if(!address){
            dispatch(setMessage("Please add address"));
            return;
        }
        if(workUser && skills.length == 0){
            dispatch(setMessage("At least one skill should be seleted"));
            return;
        }
        if(workUser && desc.length <10 ){
            dispatch(setMessage("Please add a breif description about your work experience"));
            return;
        }
        if (checkBtn.current.context._errors.length === 0) {
            
            var workerSkills = skills.map(v => ({"skillId":v.id, "skillName":v.text }));

            console.log(workerSkills);
            setLoading(true);
            if(workUser){
                registerAsWorker(email, password, firstName, lastName, escape(address), escape(desc), workerSkills)
                    .then(

                        () => {
                            history.push("/home");
                            window.location.reload();
                        })
                        .catch((error) => {
                            console.log(error);
                          const message =
                            (error.response &&
                              error.response.data &&
                              error.response.data.message) ||
                            error.message ||
                            error.toString();
                    
                          dispatch({
                            type: SET_MESSAGE,
                            payload: message,
                          });
                          setLoading(false);
                          return Promise.reject();
                        }
                    );
            }
            else{
                registerHelpFinderUSer(email, password, firstName, lastName, address)
                .then(()=>{
                        history.push("/home");
                        window.location.reload();
                    })
                    .catch((error) => {
                        console.log(error);
                    const message =
                        (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString();
                
                    dispatch({
                        type: SET_MESSAGE,
                        payload: message,
                    });
                    setLoading(false);
                    return Promise.reject();
                    }
                );
            }
        } else {
            setLoading(false);
        }
    };

    const escape = function (str) {
        return str
          .replace(/[\\]/g, '\\\\')
          .replace(/[\"]/g, '\\\"')
          .replace(/[\/]/g, '\\/')
          .replace(/[\b]/g, '\\b')
          .replace(/[\f]/g, '\\f')
          .replace(/[\n]/g, '\\n')
          .replace(/[\r]/g, '\\r')
          .replace(/[\t]/g, '\\t');
      };

    if (isLoggedIn) {
        return <Navigate to="/home" />;
    }
  
    /*skill tag section*/
    const handleSkillDelete = (i) => {
        setSkills(skills.filter((skill, index) => index !== i));        
        console.log(skills);
      };
    
      const handleSkillAddition = (skill) => {
        if(skillTags.includes(skill))
            setSkills([...skills, skill]);
        console.log(skills);
      };
    
      const handleSkillDrag = (skill, currPos, newPos) => {
        const newSkills = [...skills].slice();
    
        newSkills.splice(currPos, 1);
        newSkills.splice(newPos, 0, skill);
    
        setSkills(newSkills);
      };
    
      const handleSkillTagClick = (index) => {
        //console.log("The skill at index " + index + " was clicked");
      };
    
      const onSkillClearAll = () => {
        setSkills([]);
      };
    
      const onSkillTagUpdate = (i, newSkill) => {
        const updatedSkills = skills.slice();
        updatedSkills.splice(i, 1, newSkill);
        setSkills(updatedSkills);
      };
      const KeyCodes = {
        comma: 188,
        enter: 13,
      };
      
      const delimiters = [KeyCodes.comma, KeyCodes.enter];
    /*end of skill tag section*/

    return (
        <div className="col-md-12 card-register container tc pa4 min-vh-100">
        <div className="card card-container ">
            <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
            />
        
            <Form onSubmit={e => { e.preventDefault(); }}  ref={form}>

                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <Input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={firstName}    
                    onChange={onChangeFirstName}          
                    validations={[required]}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <Input
                    type="text"
                    className="form-control"
                    name="lastName"
                    onChange={onChangeLastName}          
                    value={lastName}              
                    validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <Autocomplete setAdddress={setAdddress} />     
                    </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
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
                    validations={[passwordRequired]}
                    />
                </div>

                
                <div className="workuser-checkbox-container">
                    <label htmlFor="workderaccount">Register as a worker</label>
                    <div className="workuser-checkbox">
                        <ToggleButton  inactiveLabel='no'
                            activeLabel='yes'                            
                            value={workUser}
                            onToggle={(value) => {
                                setWorkUser(!value);                            
                            }}/>
                    </div>
                </div>
              {workUser &&
                <div>  
                    <div className="form-group skillTags">
                        <label htmlFor="skills">Add your skills</label>
                        <ReactTags
                            handleDelete={handleSkillDelete}
                            handleAddition={handleSkillAddition}
                            handleDrag={handleSkillDrag}
                            delimiters={delimiters}
                            handleTagClick={handleSkillTagClick}
                            onClearAll={onSkillClearAll}
                            onTagUpdate={onSkillTagUpdate}
                            suggestions={skillTags}
                            placeholder="Find skills to add..."
                            minQueryLength={1}
                            maxLength={5}
                            autofocus={false}
                            allowDeleteFromEmptyInput={false}
                            autocomplete={true}
                            readOnly={false}
                            allowUnique={true}
                            allowDragDrop={false}
                            inline={false}
                            allowAdditionFromPaste={false}
                            editable={false}
                            clearAll={false}
                            tags={skills}
                            
                        />                    
                    </div>

                    <div className="form-group">
                        <label htmlFor="desc">Describe you experience and skills(Max 200 chars)</label>
                        <textarea
                            maxLength="200"
                            type="multiline" 
                            className="form-control"
                            name="desc"
                            onChange={onChangeDesc}          
                            value={desc}              
                            validations={[required]}
                        />
                    </div>
                </div>
                }
            <div className="button" >
                <button className="primary " type="button" disabled={loading} onClick={e => { handleRegister(e);}}>
                {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Register</span>
                </button>
            </div>

            <div className="notmember">
                <span className="">Already a Member?</span>
                <Link to={"/login"} className="navbar-brand">
                Login</Link> 
            </div>


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


export default Register;