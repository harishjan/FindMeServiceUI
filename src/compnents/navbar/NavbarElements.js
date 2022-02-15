//reference taken from https://www.geeksforgeeks.org/create-a-responsive-navbar-using-reactjs/
import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
  
export const Nav = styled.nav`
  background-color: #231E39;
	border-radius: 5px;
	box-shadow: 0px 10px 10px -10px rgba(0,0,0,0.75);
  position:fixed;
  font-family: Montserrat, sans-serif;
  z-index:10; 
	color: #B3B8CD;
 // background: #63D471;
  height: 85px;
  display: flex;
  justify-content: space-between;
  //padding: 0.2rem calc((100vw - 1500px) / 2);
  z-index: 12;
  /* Third Nav */
  /* justify-content: flex-start; */
  width:100%;  
  padding-top:10px;
  margin-bottom: 200px;	        
  margin-top: -10px;
  
`;
  
export const NavLink = styled(Link)`
  color: #808080;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #03BFCB;
    font-weight: bold;
  }
  &:hover {  
    color: #03BFCB;
    font-weight: bold;
  }
`;
  
export const Bars = styled(FaBars)`
  display: none;
  color: #03BFCB;  

  @media screen and (max-width: 600px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    color: #03BFCB;
    transform: translate(-100%, 75%);
    font-size: 2.4rem;
    cursor: pointer;
  }
`;
  
export const NavMenu = styled.div`
  
  display: flex;
  align-items: center;
  margin-right: -24px;
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */
  @media screen and (max-width: 600px) {
    //display: none;
  }
`;
  
export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  /* Third Nav */
  /* justify-content: flex-end;
  width: 100vw; */
  @media screen and (max-width: 600px) {
    //display: none;
  }
`;/*
export const NavIcon = styled(Link)`
margin-left: 2rem;
font-size: 2rem;
height: 80px;
display: flex;
justify-content: flex-start;
align-items: center;
`;*/
export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #03BFCB;
  padding: 10px 22px;
  color: #000000;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav */
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #808080;
  }
`;