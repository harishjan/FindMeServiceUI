
//reference from https://medium.com/geekculture/create-a-simple-search-component-in-react-js-using-react-hooks-710c1dfe8b58
// src/components/Search.js

import React, { useEffect, useState } from 'react';
import Scroll from './Scroll';
import SearchList from './SearchList';
import SearchField from 'react-search-field';
import { useDispatch, useSelector } from 'react-redux';
import { setMessage } from '../../actions/message';
import {searchSkills} from "../../services/skillSearch"
import { SET_MESSAGE } from '../../enums/constant';
function Search() {

  const [searchedKey, setSearchedKey] = useState("");
  const [searchedResult, setSearchedResult] = useState("");
  const { lat: curLat, long: curLong, locationDeclined: locDeclined } = useSelector((state) => state.geoLocation);
  const { message } = useSelector(state => state.message);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();  
 
  function onSearchClick(searchValue)  {
    setLoading(true);
    dispatch(setMessage(""));        
    if( locDeclined){
        dispatch(setMessage("Please allow the browser to get your location to start the search"));      
        setLoading(false)  
        return;
    }
    if(!searchValue){
        dispatch(setMessage("Please enter a skill to search"));        
        setLoading(false)
        return;
    }
    setSearchedKey(searchValue);             
    searchSkills(searchValue, 5 , "40.5757637023926", "-74.3618087768555").then(
        (result) => {
            console.log(result.data)
            if(!result.data || result.data.length == 0){
                dispatch({
                    type: SET_MESSAGE,
                    payload: "No Matching result found",
                  });
            }
            else
                setSearchedResult(result.data);
            setLoading(false);
            return Promise.resolve();
        },
        (error) => {
            console.log(error);
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
    
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
          setLoading(false);
          return Promise.reject();
        }
      );
      setLoading(false);

   

  }

 
  useEffect(() => {        
      if(locDeclined)
        dispatch(setMessage("Please allow the browser to get your location to start the search"));
  },[locDeclined]);


  return (
    <section className="searchbox-container">
      <div className="navy georgia ma0 grow">
        <h2>Lets go, Find Someone who can help your with your work </h2>
      </div>
      <div className="pa2">
      <SearchField  classNames="searchbox"
        placeholder='Search For a skill, eg: handyman'
        onSearchClick={onSearchClick}    onEnter={onSearchClick} 
                   
        />
      </div>
      {loading && (
                <span className="spinner-border spinner-border-sm"></span>
      )}
      {searchedResult &&
    
       <SearchList result={searchedResult} />
      
      }
       {message && (
        <div className="form-group">
        <div className="alert alert-danger" role="alert">
            {message} 
        </div>
        </div>
       )}  
    </section>
  );
}

export default Search;