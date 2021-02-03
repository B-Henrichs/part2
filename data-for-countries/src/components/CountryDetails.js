import React from 'react';
import Weather from './Weather';

// Component for displaying details of a country

const CountryDetails = ({country}) => {
    return (
        <>
            <h1>{country.name}</h1>
            <p><strong>Capital:</strong> {country.capital}</p>
            <p><strong>Population:</strong> {country.population}</p>
            <h2><strong>Languages</strong></h2>
            <ul>
                {
                    country.languages.map(language => <li key={language.name} ><i>{language.name}</i></li>)
                }
            </ul>
            <img src={country.flag} alt='Nations Flag' style={{width: 100}} />
            <Weather country={country}/>
        </>
    );
};

export default CountryDetails;