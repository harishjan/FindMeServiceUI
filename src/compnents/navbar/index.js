import React, {useState, useEffect, useCallback} from 'react'
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
 //   NavIcon
  } from './NavbarElements';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux"

import { DownOutlined } from '@ant-design/icons';
//import { Menu, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { authLogin, authLogout } from "../../actions/authentication"
import events from "../../helper/events"
//import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
export default function HeaderNavBar() {
  
  const [sidebar, setSidebar] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);  
  const dispatch = useDispatch();
  const showSidebar = () => setSidebar(!sidebar);
  function myFunction() {
      var x = document.getElementById("navicon");
      if (x.className === "navicon") {
        x.className += " responsive";
      } else {
        x.className = "navicon";
      }
    }
    
    const logOut = useCallback(() => {
      dispatch(authLogout());
    }, [dispatch]);

    useEffect(() => {  
      events.on("logout", () => {
        logOut();
      });
  
      return () => {
        events.remove("logout");
      };
    }, [currentUser, logOut]);

    function capitalizeFirstLetter(value){
        if(value.length === 0) return value;
        return value.charAt(0).toUpperCase()+ value.slice(1);
    }
    return (
    <>
      <Nav>
        
        <NavMenu>  
          <NavLink to='/home' className="navlink" activeStyle>
            HelpFinder
          </NavLink>          
         
                
          {!currentUser &&    
          <NavLink to='/register' className="navlink" activeStyle>
            Sign Up
          </NavLink>}      
        </NavMenu>
        {!(currentUser) ?
        <NavBtn>
          <NavBtnLink to='/login' className="navlink" >Sign In</NavBtnLink>
        </NavBtn> 
        :(
        <div className="profilemenu-container">
            <Dropdown>
                <Dropdown.Toggle >
                Hello {capitalizeFirstLetter(currentUser.firstName)}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                <Dropdown.Item href="/profile">
                    My Profile
                </Dropdown.Item>
                
                <Dropdown.Item href="/login" onClick={logOut}>
                    Logout
                </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown> 
        </div>)

        }   
        
      
    
      </Nav>
    </>
  )
}