


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
import WorkInquiry from "./workinquiry"
import 'react-tabs/style/react-tabs.css';
import WorkRequestReceived from "./WorkRequestReceived";

const Profile = (props) => {
   
    const { isLoggedIn } = useSelector(state => state.auth);
   
   
    if (isLoggedIn) {
      //  return <Navigate to="/home" />;
    }
  
    
      const [tabIndex, setTabIndex] = useState(0);
    
    return (
        <div className="container profiles-container tc pa4 min-vh-100">
           <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)} className="tabs tc pa4 min-vh-100">
            <TabList>
                <Tab>My information</Tab>
                <Tab>Work Inquiry</Tab>
                {/*user.role.includes('ROLE_WORKER_USER') && <Tab>Work Request received</Tab>*/}
                <Tab>Work Request received</Tab>
            </TabList>
            <TabPanel><ProfileInfo/></TabPanel>
            <TabPanel><WorkInquiry/></TabPanel>
            <TabPanel><WorkRequestReceived/></TabPanel>
            </Tabs>
      
        </div>
    );
};


export default Profile;