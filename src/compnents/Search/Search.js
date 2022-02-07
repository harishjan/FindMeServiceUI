
//reference from https://medium.com/geekculture/create-a-simple-search-component-in-react-js-using-react-hooks-710c1dfe8b58
// src/components/Search.js

import React, { useState } from 'react';
import Scroll from './Scroll';
import SearchList from './SearchList';
import SearchField from 'react-search-field';

function Search() {

  const [searchedKey, setSearchedKey] = useState("");
  const [searchedResult, setSearchedResult] = useState("");

  /*const filteredPersons = details.filter(
    person => {
      return (
        person
        .name
        .toLowerCase()
        .includes(searchField.toLowerCase()) ||
        person
        .email
        .toLowerCase()
        .includes(searchField.toLowerCase())
      );
    }
  );*/

 /* const handleChange = e => {
    setSearchField(e.target.value);
  };
*/
 
  function onSearchClick(searchValue)  {
    setSearchedKey(searchValue);
    
      //do search 
      //get the results
      // testing with dummy details
    setSearchedResult(initialDetails)

  }

  return (
    <section className="searchbox-container">
      <div className="navy georgia ma0 grow">
        <h2>Lets go, Find Someone who can help your with your work </h2>
      </div>
      <div className="pa2">
      <SearchField  classNames="searchbox"
        placeholder='Search For a skill, eg: handyman'
        onSearchClick={onSearchClick}
        />
      </div>
      {searchedResult &&
    
       <SearchList result={searchedResult} />
      
      }
    </section>
  );
}


const initialDetails = [
    {
      id: 1,    
      firstName: "Jane",
      lastName: "Doe",
      email: "janedoe@gmail.com",
      address: "New Delhi, India",
    },
    {
      id: 2,    
      firstName: "Mary",
      lastName: "Rosamund",
      email: "agra@rosie.com",
      address: "Tbilisi, India",
    },
    {
      id: 3,    
      firstName: "Sherlock",
      lastName: "Watson",      
      email: "irene@johnlock.com",
      address: "Baker Street, India",
    },
    {
      id: 4, firstName: "John",
      lastName: "Holmes",      
      email: "mary@johnlock.com",
      address: "Baker Street, India",
    },
    {
      id: 5, 
      firstName: "Mycroft",
      lastName: "Lestrade",      
      email: "britishgovt@gmail.com",
      address: "London, India",
    },
  ];
export default Search;