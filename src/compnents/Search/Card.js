
//reference from https://codepen.io/FlorinPop17/pen/EJKgKB
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate    } from "react-router-dom";
import Popup from 'reactjs-popup';
import DatePicker from "react-datepicker";
import { useAlert  } from 'react-alert'
import {sendWorkInquiry} from "../../services/userService"
import "react-datepicker/dist/react-datepicker.css";
import { setMessage } from '../../actions/message';
import { SET_MESSAGE } from '../../enums/constant';
import { logout } from '../../services/authService';
import { authLogout } from '../../actions/authentication';

function Card({data, key}) {    
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
    
    const  currentDate = new Date();
    currentDate.setHours(0,0,0,0);
    const alert = useAlert ();

    const dispatch = useDispatch();
    const handleSubmit = () => {           
       navigate('/login');        
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
            })
            .catch((error) => {                
                console.log("log erro");
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
        
              setMessageInquiry(message);
              
              setLoading(false);
              return Promise.reject();
            });
        
            
    }
    
    const onChangeInstruction = (e) => {        
        setInstruction(e.target.value);
    };

    
  return(    
    
    <div className="searchcard-container">
        <span className="pro">Expert</span>
        <img className="round" alt={data.user.firstName} src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"  />
        <h3>{data.user.firstName} {data.user.lastName}</h3>
        <h6 className="address">{data.user.address} </h6> 
        <h15 className="miles"> {Number((data.distanceFromUsersLocation).toFixed(1))} mile away</h15>        
        <p className="userdesc">{data.user.userDescription}</p>
        {visibilityofpopup ?
        <div className="buttons">            
            {currentUser ?                  
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
                        var val = requestForWork(data.user.userId , Number((data.distanceFromUsersLocation).toFixed(1))) 
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
            
                </Popup>:
                    <button className="primary" onClick={(e) => handleSubmit(data.user.userId)} >
                    Login and request for Work
                    </button>    
             }   
        </div>
        :
        <div className="message-sent">Work Inquiry sent</div>
        }
        <div className="skills">
            <h6>Skills</h6>
            <ul>
            {data.user.skills.map(d =>                 
                <li>{d.skillName}</li>
                
            )}            
            </ul>
        </div>
    </div>    
  );
}

export default Card;