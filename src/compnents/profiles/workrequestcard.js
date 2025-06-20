
//reference from https://codepen.io/FlorinPop17/pen/EJKgKB
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function WorkRequestCard({user}) {    
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
    <div class="searchcard-container">
        <span class="pro">Expert</span>
        <img class="round" alt={user.firstName} src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"  />
        <h3>{user.firstName} {user.lastName}</h3>
        <h6>{user.address} </h6> <h15 class="miles"> 1 mile away</h15>
        <p>I am an experience handyman with many year of work expereince</p>

        <div class="status">Status : Request Accepted, Go ahead Hire the workder!!!</div>
        <div class="buttons">
                       
            <button class="primary" onClick={handleSubmit}>
                Hire the worker
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

export default WorkRequestCard;
