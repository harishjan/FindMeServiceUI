// src/components/SearchList.js

import React from 'react';
import Card from './Card';

function SearchList({ result }) {    
    console.log("test");
    console.log(result);
    const displayResult = result.map(data =>  <Card key={data.user.id} data={data} />);    
    return (
        <div className="searchgrid-container">
            {displayResult}
        </div>
    );
}

export default SearchList;
