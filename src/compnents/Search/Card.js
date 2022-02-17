
//reference from https://codepen.io/FlorinPop17/pen/EJKgKB
import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate    } from "react-router-dom";

function Card({data}) {    
    const navigate = useNavigate();
    const { user: currentUser } = useSelector((state) => state.auth);
    const handleSubmit = () => {      
        currentUser ?   
            requestForWork() : navigate('/login');        
      }
    const requestForWork= () =>{
        alert("request for work")
    }
  return(    

    <div className="searchcard-container">
        <span className="pro">Expert</span>
        <img className="round" alt={data.user.firstName} src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"  />
        <h3>{data.user.firstName} {data.user.lastName}</h3>
        <h6>{data.user.address} </h6> <h15 className="miles"> {Number((data.distanceFromUsersLocation).toFixed(1))} mile away</h15>
        <p className="userdesc">{data.user.userDescription}</p>
        <div className="buttons">
            <button className="primary" onClick={handleSubmit}>
                {currentUser ? "Request for work" : "Login and request for Work"}
            </button>            
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