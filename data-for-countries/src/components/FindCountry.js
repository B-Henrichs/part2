import React from 'react';

// Component with an input for finding countries

const FindCountry = ({country, setCountry}) => {
    return (
        <div>
            <label htmlFor='find-country'>Find countries: </label>
            <input  value={country} 
                onChange={event => setCountry(event.target.value)}
            />
        </div>
    );
};

export default FindCountry;