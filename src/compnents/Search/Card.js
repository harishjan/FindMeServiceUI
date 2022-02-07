
//reference from https://codepen.io/FlorinPop17/pen/EJKgKB
import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate    } from "react-router-dom";

function Card({user}) {    
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
    /* <span>
    <div className="tc bg-light-grey dib br3 pa10 ma2 grow bw2 shadow-5">

      <img className="br-100 h3 w3 dib" alt={user.firstName} src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
      <div>
        <h1>{user.firstName} {user.lastName}</h1>
      </div>      
    </div>
    </span>*/

    <div class="searchcard-container">
        <span class="pro">Expert</span>
        <img class="round" alt={user.firstName} src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"  />
        <h3>{user.firstName} {user.lastName}</h3>
        <h6>{user.address} </h6> <h15 class="miles"> 1 mile away</h15>
        <p>I am an experience handyman with many year of work expereince</p>
        <div class="buttons">
            <button class="primary" onClick={handleSubmit}>
                {currentUser ? "Request for work" : "Login and request for Work"}
                
            </button>            
        </div>
        <div class="skills">
            <h6>Skills</h6>
            <ul>
                <li>Handyman</li>
                <li>Painting</li>
                <li>Gardening</li>                
            </ul>
        </div>
    </div>
    
  );
}

export default Card;