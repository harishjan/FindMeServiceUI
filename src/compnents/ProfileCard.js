
//reference from https://codepen.io/FlorinPop17/pen/EJKgKB
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate    } from "react-router-dom";
import Popup from 'reactjs-popup';
import DatePicker from "react-datepicker";
import { useAlert  } from 'react-alert'
import {cancelInquiry, commitInquiry, hireInquiry, sendWorkInquiry} from "../services/userService"
import "react-datepicker/dist/react-datepicker.css";
import { setMessage } from '../actions/message';
import { SET_MESSAGE } from '../enums/constant';
import { logout } from '../services/authService';
import { authLogout } from '../actions/authentication';

function ProfileCard({inquiry, dispUser, key}) {    
    const navigate = useNavigate();
    const { user: currentUser } = useSelector((state) => state.auth);
    var today = new Date();
    today.setHours(0,0,0,0);
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [messageInquiry, setMessageInquiry ] = useState("");
    const [instruction, setInstruction] = useState("");
    const [loading, setLoading] = useState(false);
    const [visibilityofpopup, setVisibilityofpopup] = useState("false");
    const [inquiryValue, setInquiryValue] = useState("");
    const  currentDate = new Date();
    currentDate.setHours(0,0,0,0);
    const alert = useAlert ();

    const dispatch = useDispatch();
    const handleSubmit = () => {           
       navigate('/login');        
    }

    const commitWorkClick = async(inquiryId) => {
        dispatch(setMessage(""));
        setMessageInquiry("");
        setLoading(true);
      
      
       await commitInquiry (inquiryId).then(
            () => {
                alert.show('Work commitment  sent!!!');
                setVisibilityofpopup(false)  
                inquiry.isCommited = true;
                setLoading(false);
                
                return Promise.resolve();
            },(error)=>{
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
                dispatch(setMessage(message))
                alert.show('Error updaing the work request');
              
              setLoading(false);
              return Promise.resolve();
            })
            .catch((error) => {                
                console.log("log error");
                console.log(error);              
                setLoading(false);
                return Promise.resolve();
            });

    }


    const cancelWorkClick = async(inquiryId) => {
        dispatch(setMessage(""));
        setMessageInquiry("");
        setLoading(true);
      
      
       await cancelInquiry(inquiryId).then(
            () => {
                alert.show('Work Cancelled!!!');
                setVisibilityofpopup(false)  
                inquiry.isCancelled = true;
                setLoading(false);
                
                return Promise.resolve();
            },(error)=>{
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
                dispatch(setMessage(message))
                alert.show('Error updaing the work request');
              
              setLoading(false);
              return Promise.resolve();
            })
            .catch((error) => {                
                console.log("log error");
                console.log(error);              
                setLoading(false);
                return Promise.resolve();
            });

    }


    const hireWorkClick = async(inquiryId) => {
        dispatch(setMessage(""));
        setMessageInquiry("");
        setLoading(true);
      
      
       await hireInquiry (inquiryId).then(
            () => {
                alert.show('Well done, Worker is hired!!!');
                setVisibilityofpopup(false)  
                inquiry.hired = true;
                setLoading(false);
                
                return Promise.resolve();
            },(error)=>{
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
                dispatch(setMessage(message))
                alert.show('Error updaing the work request');
              
              setLoading(false);
              return Promise.resolve();
            })
            .catch((error) => {                
                console.log("log error");
                console.log(error);              
                setLoading(false);
                return Promise.resolve();
            });

    }

    const requestForWork = async (workerUserId, distToWorkerInMiles) =>{
        dispatch(setMessage(""));
        setMessageInquiry("");
        setLoading(true);
        var helpFinderUserId = currentUser.id;
        startDate.setHours(0,0,0,0);
        endDate.setHours(0,0,0,0);
        
        if(instruction.length < 30 || instruction.length > 200) {
            setMessageInquiry("Please add at least 30 to 200 char description of the work");
            setLoading(false);           
            return;
        }
        if(endDate < startDate ||  endDate < currentDate || startDate < currentDate){
            setMessageInquiry("Work end date is not valid");
            setLoading(false);           
            return;
            
        }        
        sendWorkInquiry(startDate, endDate, currentUser.id, workerUserId, instruction, distToWorkerInMiles).then(
            () => {
                alert.show('Work inquiry sent!!!');
                setVisibilityofpopup(false)  
                setLoading(false);
                return Promise.resolve();
            },(error)=>{                
                const message =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
        
              setMessageInquiry(message);
              
              setLoading(false);
              return Promise.resolve();
            })
            .catch((error) => {                
                console.log("log erro");
                console.log(error);            
            
            });
        
            
    }
    
    const onChangeInstruction = (e) => {        
        setInstruction(e.target.value);
    };

    
  return(        
    <div className="searchcard-container">
        <span className="pro">Expert</span>
        <img className="round" alt={dispUser.firstName} src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"  />
        <h3>{dispUser.firstName} {dispUser.lastName}</h3>
        <h6 className="address">{dispUser.address} </h6> 
        <h15 className="miles"> {Number((inquiry.distanceFoundAwayfrom).toFixed(1))} mile away</h15>        
        <p className="userdesc">{dispUser.userDescription}</p>
        
        {currentUser && inquiry.inquiryId  && inquiry.inquiryId > 0 &&
            <div>
                <div className="status"><div className="work-detail">Status :</div>   {   
                    inquiry.isCancelled === true ?  "Work is cancelled"                        
                    :
                    (
                        inquiry.isCommited === true && inquiry.hired === false  ? "Available for Work, waiting to be hired!!!"
                        :
                        (
                            inquiry.hired === true ?
                                "Well Done. This work is confirmed!!!"
                            :
                                "Work request is pending"
                        )
                    )
                    
                }   

                    <div>
                        <div className="work-detail">Work details:</div> {inquiry.workDescription}
                        <div className="work-detail">Work Starts:</div> {new Date(inquiry.workStartDate).toLocaleDateString('en-us', {year: 'numeric', month:'short', day: 'numeric'})}
                        <div className="work-detail">Work ends :</div>  {new Date(inquiry.workEndDate).toLocaleDateString('en-us', {year: 'numeric', month:'short', day: 'numeric'})}
                    </div>
                </div> 
            </div>

        }
        
        {(visibilityofpopup)?
            <div className="buttons">            
                {currentUser && inquiry.inquiryId && inquiry.inquiryId > 0 && inquiry.isCancelled == false?                         
                        dispUser.userType ===  "ROLE_HELPFINDER_USER" && inquiry.isCommited === false  ?
                        <div>   
                            <button className="primary" onClick={(e) => commitWorkClick(inquiry.inquiryId)} >
                                Inform you are available!!
                            </button>   
                        </div>                       
                        :
                        
                       dispUser.userType ===  "ROLE_WORKER_USER"   &&
                        <div>
                            {
                                inquiry.hired === false  && inquiry.isCommited === true &&
                                <span>
                                    <div>   
                                        <button className="primary" onClick={(e) => hireWorkClick(inquiry.inquiryId)} >
                                            Go ahead, Hire now!!
                                        </button>   
                                    </div>
                                </span>
                            }
                            
                            <div className="primary cancelbtn">   
                                <button className="primary" onClick={(e) => cancelWorkClick(inquiry.inquiryId)} >
                                    Cancel work
                                </button>   
                            </div>
                        
                        </div>
                        
                    :
                currentUser && !(inquiry.inquiryId) ?
                        <Popup  trigger={<button className="primary"> Request for work</button>} >                
                            <div className='workrequest-card'>                    
                            <p className="title">Lets capture the work details</p>
                            <p>From when do you want to start:</p>
                            <DatePicker selected={startDate}   minDate={currentDate} onChange={(date) => setStartDate(date)} />
                            <p>When will the work end:</p>
                            <DatePicker selected={endDate}  minDate={currentDate} onChange={(date) => setEndDate(date)} />
                            <p>What work are you looking for (max 200 char):</p>
                            <textarea
                                    maxLength="200"
                                    type="multiline" 
                                    className="form-control"
                                    name="desc"
                                    onChange={onChangeInstruction}                                                                
                                />                   
                            <div>

                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}

                            <button className="primary" onClick={(e) => {
                                var val = requestForWork(dispUser.userId , Number((inquiry.distanceFoundAwayfrom).toFixed(1))) 
                            }} >Send Request</button>

                            </div>                    
                                {messageInquiry && (
                                    <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {messageInquiry}
                                    </div>
                                    </div>
                                )}
                            </div>
                    
                        </Popup>
                    :
                    !(inquiry.inquiryId) &&    <button className="primary" onClick={(e) => handleSubmit(dispUser.userId)} >
                            Login and request for Work
                        </button>    
                }   
            </div>
        :
            !(inquiry.inquiryId && inquiry.isCancelled === true) &&
                <div className="message-sent">Work Inquiry sent</div>
            
        }
        <div className="skills">
            <h6>Skills</h6>
            <ul>
            {dispUser.skills.map(d =>                 
                <li>{d.skillName}</li>
                
            )}            
            </ul>
        </div>
    </div>    
  );
}

export default ProfileCard;