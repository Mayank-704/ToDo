import  { useRef, useState } from "react";
import "./Weather.css";
import { useEffect } from "react"


import Search_icon from "./Assets/search.png";
import Clear_icon from "./Assets/clear.png";
import Cloud_icon from "./Assets/cloud.png";
import Drizzle_icon from "./Assets/drizzle.png";
import Humidity_icon from "./Assets/humidity.png";
import Snow_icon from "./Assets/snow.png";
import Wind_icon from "./Assets/wind.png";
import Rain_icon from "./Assets/rain.png"

function Weather() {


  const inputRef=useRef();

  const [weatherDate, setweatherData] = useState(false);

  const allIcons = {
    "01d": Clear_icon,
    "01n": Clear_icon,
    "02d": Cloud_icon,
    "02n": Cloud_icon,
    "03d": Cloud_icon,
    "03n": Cloud_icon,
    "04d": Drizzle_icon,
    "04n": Drizzle_icon,
    "09n": Rain_icon,
    "13d":Snow_icon,
    "13n":Snow_icon,


  };


  const search = async (city) => {
    if(city===""){
      alert("Enter City Name");
    }
    try {
      // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_APP_ID}`;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;


      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      const icon=allIcons[data.weather[0].icon] ||Clear_icon;
      setweatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon:icon
      })
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    search("London");
  }, [])



  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img src={Search_icon} alt="no" onClick={()=>{
          search(inputRef.current.value)
        }} />
      </div>

      <img src={weatherDate.icon} alt="" className="weather-icon" />
      <p className="temp">{weatherDate.temperature}­°C</p>
      <p className="city">{weatherDate.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={Humidity_icon} alt="" />
          <div>
            <p>{weatherDate.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={Wind_icon} alt="" />
          <div>
            <p>{weatherDate.windSpeed}km/hr</p>
            <span>Wind speed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
