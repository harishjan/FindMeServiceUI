// src/components/SearchList.js

import React from 'react';
import Card from './Card';

function SearchList({ result }) {    
    const displayResult = result.map(user =>  <Card key={user.id} user={user} />);    
    return (
        <div className="searchgrid-container">
            {displayResult}
        </div>
    );
}

export default SearchList;
