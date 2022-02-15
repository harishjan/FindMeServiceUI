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

  
     
 function profileMenu() {
        return (
          <div style={{ display: 'block', 
                        width: 700, 
                        padding: 30 }}>
            <h4>React-Bootstrap Dropdown Component</h4>
            <Dropdown>
              <Dropdown.Toggle variant="success">
                Open Menu
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#">
                  Home Page
                </Dropdown.Item>
                <Dropdown.Item href="#">
                  Settings
                </Dropdown.Item>
                <Dropdown.Item href="#">
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        );
      }    
    
  function capitalizeFirstLetter(value){
    return value.charAt(0).toUpperCase()+ value.slice(1);
  }
  return (
    <>
      <Nav>
        
        <NavMenu>  
          <NavLink to='/home' className="navlink" activeStyle>
            Search
          </NavLink>          
          {currentUser &&
          <>
          <NavLink to='/profile' className="navlink" activeStyle>
          {currentUser.firstName}
          </NavLink>   
          <NavLink to='/login' className="navlink" onClick={logOut}>
          LogOut
        </NavLink>
        </>
          }
                
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
      </Dropdown> </div>)

        }   
        
      
    
      </Nav>
    </>
  )
}