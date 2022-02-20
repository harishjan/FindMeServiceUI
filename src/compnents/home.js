import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux"
import Search from './Search/Search';
import { clearMessage, setMessage } from "../actions/message";


const Home = () => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();    
  useEffect(() => {
    dispatch(clearMessage());   
  
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
