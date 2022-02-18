
//reference from https://codepen.io/FlorinPop17/pen/EJKgKB
import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate    } from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function Card({data, key}) {    
    const navigate = useNavigate();
    const { user: currentUser } = useSelector((state) => state.auth);
    const handleSubmit = (userId) => {   
        
       navigate('/login');        
      }
    const requestForWork = (workerUserId, HelpFinderUserId) =>{
       
       
     
        //alert("request for work")
    }
  return(    

    <div className="searchcard-container">
        <span className="pro">Expert</span>
        <img className="round" alt={data.user.firstName} src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"  />
        <h3>{data.user.firstName} {data.user.lastName}</h3>
        <h6>{data.user.address} </h6> <h15 className="miles"> {Number((data.distanceFromUsersLocation).toFixed(1))} mile away</h15>
        <p className="userdesc">{data.user.userDescription}</p>
        <div className="buttons">
            
            {currentUser ?  
                <Popup  trigger={<button className="primary" > Request for work"</button>} >
                <div>
                <div className='add-dialog'>
                <h3>Add item to display</h3>
                <p>Request {data.user.firstName} for work</p>
                <div className="add-dialog-buttons">
                    <button >No</button>
                    <button >Yes, add item</button>
                </div>
    </div>
                </div>
                </Popup>:
                    <button className="primary" onClick={(e) => handleSubmit(data.user.userId)} >
                    Login and request for Work
                    </button>    
            }   
        </div>
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