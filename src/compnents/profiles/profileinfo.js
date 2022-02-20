import React, { useState, useRef, useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { getUserInfo } from "../../services/userService";

const ProfileInfo = () => {
    const { isLoggedIn } = useSelector(state => state.auth);    
    const [ dispUser, setUser] = useState(null);    
    const [messageInfo, setMessageInfo] = useState({tex:"",isError:false})
    const [loading, setLoading] = useState(false);
    if (!isLoggedIn) {
       return <Navigate to="/home" />;
    }
    
    useEffect(()=>{
        // call api to fetch work inquriy
      //dummy initialDetails
    setLoading(true);
    setMessageInfo({tex:"",isError:false});
        
    getUserInfo().then(
        (result) => {
            console.log(result);
            if(result.data )
                setUser(result.data)
            else
                setMessageInfo({tex:"Error fetching your information ",isError:true});
            setLoading(false);
            return Promise.resolve();
        },(error) => {
                            
            if (error.response.status === 401) 
            return <Navigate to="/home" />;
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
        .catch((error) => {            
            console.log("log error");
            console.log(error);
            
            setMessageInfo({tex:message,isError:true});
            setLoading(false);
            return Promise.resolve();
        });
    
    },[]);

    return(
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
            {dispUser &&
                <div class="myinfo-container">
                       {dispUser.userType ===  "ROLE_WORKER_USER" && <span class="pro">Expert</span>}
                        <img class="round" alt='Jim Carry' src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"  />
                        <h3>{dispUser.firstName} {dispUser.lastName}</h3>
                        <h6 className="address">{dispUser.address} </h6> 
                        <p className="userdesc">{dispUser.userDescription}</p>                 
                        <div class="skills">
                        <h6>Skills</h6>
                            <ul>
                            {dispUser.skills.map(d =>                 
                                <li>{d.skillName}</li>
                                
                            )}            
                            </ul>
                        </div>
                </div>
            }
        </>
        );

         
};

export default ProfileInfo;