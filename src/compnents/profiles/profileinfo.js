import React, { useState, useRef, useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProfileInfo = () => {
    const { isLoggedIn } = useSelector(state => state.auth);    
    if (isLoggedIn) {
     //   return <Navigate to="/home" />;
    }
    const { user: currentUser } = useSelector((state) => state.auth);
    return(
           
                
       

            <div class="myinfo-container">
                    <span class="pro">Expert</span>
                    <img class="round" alt='Jim Carry' src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"  />
                    <h3>Jim Carry</h3>
                    <h6>101 madiosn street , nyc, USA</h6>
                    <p>I am an experience handyman with many year of work expereince</p>                    
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

         {/*<div class="searchcard-container">
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
            </div>*/}
};

export default ProfileInfo;