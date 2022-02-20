// src/components/SearchList.js

import React from 'react';
import ProfileCard from '../ProfileCard';

function SearchList({ result }) {    
    console.log("test");
    console.log(result[0].user.userId);
    const displayResult = result.map(data =>  <ProfileCard key={data.user.userId} dispUser={data.user} inquiry={data} />);    
    return (
        <div className="searchgrid-container">
            {displayResult}
        </div>
    );
}

export default SearchList;
