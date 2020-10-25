import React from 'react';
import './weather.scss';

const Weather = ({ weather }) => {
   if (weather)
      return (
         <div key={weather.id} className="WeatherCard">
            <div className="CityName">{weather.city}, {weather.country}</div>
            <div className="Main">
               <div className="Temperature">{weather.temperature} {'\u00B0'}C</div>
               <img className="Icon" src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="icon"></img>
            </div>
            <div className="Secondary">
               <div className="Parameter">
                  <div>Wind</div>
                  <div>{weather.wind} m/s</div>
               </div>
               <div className="Parameter">
                  <div>Humidity</div>
                  <div>{weather.humidity} %</div>
               </div>
               <div className="Parameter">
                  <div>Pressure</div>
                  <div>{weather.pressure} kPa</div>
               </div>
            </div>
         </div>
      );
   return (<></>);
};

export default Weather;
