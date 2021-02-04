import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FindCountry from './components/FindCountry';
import CountryList from './components/CountryList';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');

  // Fetch countries from API
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data));
  }, []);
  return (
    <div>
          <FindCountry country={country} setCountry={setCountry} />
          <CountryList country={country} countries={countries} setCountry={setCountry} />
    </div>
  );
};

export default App;