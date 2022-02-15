import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux"
import Search from './Search/Search';
import {getUserDetails, getUserInquirySubmission, getUserInquiryReceived} from "../services/userService";
import { clearMessage, setMessage } from "../actions/message";


const Home = () => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();    
  useEffect(() => {
    dispatch(clearMessage());   
    getUserInquirySubmission().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);
 
  return (
      
    <div className="container">   
     
      <div className="tc pa4 min-vh-100">
        <Search/>
       
      </div>
     
    </div>
  );
};

export default Home;
