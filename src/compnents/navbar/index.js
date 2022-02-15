import React, {useState, useEffect} from 'react'
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

export default function HeaderNavBar() {
  
    const [sidebar, setSidebar] = useState(false);
  
    const showSidebar = () => setSidebar(!sidebar);
    function myFunction() {
        var x = document.getElementById("navicon");
        if (x.className === "navicon") {
          x.className += " responsive";
        } else {
          x.className = "navicon";
        }
      }
  return (
    <>
      <Nav>
        
        <NavMenu>  
            
          <NavLink to='/home' className="navlink" activeStyle>
            Search
          </NavLink>          
         
          <NavLink to='/profile' className="navlink" activeStyle>
            Profiles
          </NavLink>         
          <NavLink to='/register' className="navlink" activeStyle>
            Sign Up
          </NavLink>         
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/login' className="navlink" >Sign In</NavBtnLink>
        </NavBtn>        
      </Nav>
    </>
  )
}