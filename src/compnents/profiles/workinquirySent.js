// src/components/SearchList.js

import React, { useEffect, useState } from 'react';
import {  getInquiriesSent  } from '../../services/userService';
import ProfileCard from '../ProfileCard';
import WorkInquiryCard from './workinquirycard';

function WorkInquirySent() {    
    const [result, setResult] = useState([])
    const [messageInfo, setMessageInfo] = useState({tex:"",isError:false})
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        // call api to fetch work inquriy
        //dummy initialDetails
        setLoading(true);
        setMessageInfo({tex:"",isError:false});
            
        getInquiriesSent().then(
              (result) => {
                console.log(result);
                  if(result.data && result.data.length > 0)
                    setResult(result.data.map(inquiry =>  <ProfileCard key={inquiry.workerUser.userId} dispUser={inquiry.workerUser} inquiry={inquiry} />));   
                //  alert.show('Work inquiry sent!!!');
                  //setVisibilityofpopup(false)  
                  else
                    setMessageInfo({tex:"No work inquiries found",isError:false});
                  setLoading(false);
                  return Promise.resolve();
              },(error) => {
                  
              console.log("log erro");
              console.log(error);            
              const message =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
        
              //setMessageInquiry(message);
              setMessageInfo({tex:message,isError:true});
              setLoading(false);
              return Promise.resolve();
            })
              .catch(() => {
                  
                console.log("log erro");
                console.log(error);
                setLoading(false);
                return Promise.resolve();
              });
          
              
    
        
    },[])
    
    return (
        
        <>
         {loading && (
                <span className="spinner-border spinner-border-sm"></span>
          )}
        {messageInfo && (
        <div className="form-group">
        <div className={messageInfo.isError ? "alert alert-danger" : "info"}  role="alert">
            {messageInfo.text} 
        </div>
        </div>
       )}  
        {result.length > 0 &&
        <div className="searchgrid-container">
            {result}
        </div>
        }
        </>
    );
}


const initialDetails = [
    {
      id: 1,    
      firstName: "Jane",
      lastName: "Doe",
      email: "janedoe@gmail.com",
      address: "New Delhi, India",
    },
    {
      id: 2,    
      firstName: "Mary",
      lastName: "Rosamund",
      email: "agra@rosie.com",
      address: "Tbilisi, India",
    },
    {
      id: 3,    
      firstName: "Sherlock",
      lastName: "Watson",      
      email: "irene@johnlock.com",
      address: "Baker Street, India",
    },
    {
      id: 4, firstName: "John",
      lastName: "Holmes",      
      email: "mary@johnlock.com",
      address: "Baker Street, India",
    },
    {
      id: 5, 
      firstName: "Mycroft",
      lastName: "Lestrade",      
      email: "britishgovt@gmail.com",
      address: "London, India",
    },
  ];
export default WorkInquirySent;
