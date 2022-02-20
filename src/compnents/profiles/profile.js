


import React, { useState, useRef, useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import validator from 'validator'
import { clearMessage, setMessage  } from "../../actions/message"
//import AutoComplete from "react-google-autocomplete";

//import { Input, List } from "antd";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import textarea from "react-validation/build/textarea";
import { authLogin } from "../../actions/authentication";
//import CheckButton from 'react-autosuggest'
//import CheckButton from 'autosuggest-highlight'
import Autocomplete from "../Search/GoogleAddressAutoComplete";
import ToggleButton from "react-toggle-button";
import { WithContext as ReactTags } from 'react-tag-input';
import skillTags from "../../static/skills"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ProfileInfo from "./profileinfo"
import WorkInquirySent from "./workinquirySent"
import 'react-tabs/style/react-tabs.css';
import WorkRequestReceived from "./WorkRequestReceived";

const Profile = (props) => {
    const { user: currentUser } = useSelector((state) => state.auth);

   
   
    if (!currentUser) {
       return <Navigate to="/home" />;
    }
  
    
      const [tabIndex, setTabIndex] = useState(0);
    
    return (
        <div className="container profiles-container tc pa4 min-vh-100">
           <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)} className="tabs profiles-tab tc pa4 min-vh-100">
            <TabList>
                <Tab>My information</Tab>
                {currentUser && currentUser.roles.indexOf("SEARCH_FOR_WORKERS") >= 0 && <Tab>Work Inquiry</Tab>}                
                {currentUser && currentUser.roles.indexOf("ALLOWED_TO_BE_HIRE") >= 0 &&  <Tab>Work Request received</Tab>}
            </TabList>
            <TabPanel><ProfileInfo/></TabPanel>
            {currentUser && currentUser.roles.indexOf("SEARCH_FOR_WORKERS") >= 0 && <TabPanel><WorkInquirySent/></TabPanel>}
            {currentUser && currentUser.roles.indexOf("ALLOWED_TO_BE_HIRE") >= 0 &&  <TabPanel><WorkRequestReceived/></TabPanel>}
            </Tabs>
      
        </div>
    );
};


export default Profile;