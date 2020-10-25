export const formatWeather = weather => {
   
   return {
      name: weather.name,
      id: weather.id,
      city: weather.name,
      country: weather.sys.country,
      temperature: Math.round(weather.main.temp),
      icon: weather.weather[0].icon,
      wind: weather.wind.speed,
      humidity: weather.main.humidity,
      pressure: (weather.main.pressure*0.1).toFixed(1)
   }
}
