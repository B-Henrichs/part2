import React from 'react';

// Component with an input for finding countries

const FindCountry = ({country, setCountry}) => {
    return (
        <div>
            find countries
            <input  value={country} 
                onChange={event => setCountry(event.target.value)}
            />
        </div>
    );
};

export default FindCountry;