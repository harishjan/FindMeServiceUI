import React, { useState, useEffect } from "react";
import Search from './Search/Search';
import {getUserDetails, getUserInquirySubmission, getUserInquiryReceived} from "../services/userService";


const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
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
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
      <div className="tc bg-grey ma0 pa4 min-vh-100">
        <Search/>
    </div>
    </div>
  );
};

export default Home;
