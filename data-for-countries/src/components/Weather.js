import React, { useState, useEffect } from 'react'
import axios from 'axios';



const Weather = ({country}) => {
    const [data, setData] = useState(null)
    
        
 
    
    useEffect(() => {
        

        axios
          .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.name},${country.capital}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`)
          .then(response => setData(response.data));
      }, [country]);
      console.log("the data is",data)
      return (
        <div>
        <h2>Weather in {country.capital} </h2>
        {
                data ?
                <>
                    <p><strong>Temperature:</strong> {data.main.temp} freedom units</p>
                    <p><strong>Humidity:</strong> {data.main.humidity}%</p>
                    <p><strong>Wind:</strong> {data.wind.speed} mph</p>
                </>
                :
                <p>Loading weather data...</p>
            }
        </div>
    );
};

export default Weather;