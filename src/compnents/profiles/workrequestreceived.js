// src/components/SearchList.js

import React, { useEffect, useState } from 'react';
import WorkInquiryCard from './workinquirycard';

function WorkRequestReceived() {    
    const [result, setResult] = useState([])

    useEffect(()=>{
        // call api to fetch work inquriy
        //dummy initialDetails
        setResult(initialDetails.map(user =>  <WorkInquiryCard key={user.id} user={user} />));    
    })
    
    return (
        <>
        {result.length > 0 &&
        <div className="searchgrid-container">
            {result}
        </div>
        }
        </>
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
export default WorkRequestReceived;
