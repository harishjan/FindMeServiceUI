// src/components/SearchList.js

import React, { useEffect, useState } from 'react';
import { getReceivedWorkInquiry } from '../../services/userService';
import ProfileCard from '../ProfileCard';

function WorkRequestReceived() {    
    const [result, setResult] = useState([])
    const [messageInfo, setMessageInfo] = useState({tex:"",isError:false})
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
          // call api to fetch work inquriy
        //dummy initialDetails
        setLoading(true);
        setMessageInfo({tex:"",isError:false});
            
        getReceivedWorkInquiry().then(
              (result) => {
                console.log(result);
                  if(result.data && result.data.length > 0)
                    setResult(result.data.map(inquiry =>  <ProfileCard key={inquiry.helpFinderUser.userId} dispUser={inquiry.helpFinderUser} inquiry={inquiry} />));   
              
                  else
                    setMessageInfo({tex:"No work inquiries found",isError:false});
                  setLoading(false);
                  return Promise.resolve();
              })
              .catch((error) => {                  
                  console.log("log error");
                  console.log(error);
                  //tbd
                //  if (error.response.status === 401) 
                //      dispatch(authLogout());
                const message =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
          
                //setMessageInquiry(message);
                setMessageInfo({tex:message,isError:true});
                setLoading(false);
                return Promise.reject();
              });
          
    },[]);
    
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


export default WorkRequestReceived;
