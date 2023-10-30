// import React from "react";
import "./index.css";
import grazCity from "./grazCity.jpeg";
// import weatherData from "./weather.json";
import sunny from "./sunny.png";
import mild from "./mild.png";
import cold from "./cold.png";
import { React, useState, useEffect } from "react";
import API_KEY from "./API_KEY";

function MyTown() {
  const lat = "47.0707";
  const lon = "15.4395";

  const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  // const [weatherData, setWeatherData] = useState([]);
  const [tempImage, setTempImage] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [weatherMain, setWeatherMain] = useState(null);
  const [weatherDesc, setWeatherDesc] = useState(null);
  const [mainTemp, setMainTemp] = useState(null);

  const CONVERSTION_FACTOR = 273.15;

  // const weatherMain = weatherData["weather"][0].main;
  // const weatherDesc = weatherData["weather"][0].description;
  // const mainTemp = weatherData["main"].temp;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did not receive expected data");
        const weatherData = await response.json();
        const mainTemperator = weatherData["main"].temp;
        console.log(weatherData);
        // setWeatherData(listItems);

        const celsiusMainTemp = parseFloat(
          convertKelvinTempToCelsius(mainTemperator)
        ).toFixed(2);

        setWeatherMain(weatherData["weather"][0].main);
        setWeatherDesc(weatherData["weather"][0].description);
        setMainTemp(celsiusMainTemp);
        setTempImage(getTemperatureImage(celsiusMainTemp));

        setFetchError(null);
      } catch (err) {
        console.log(err.stack);
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(() => {
      fetchItems();
    }, 2000);
  }, []);

  const convertKelvinTempToCelsius = (kelvinTemperature) => {
    return kelvinTemperature - CONVERSTION_FACTOR;
  };

  const getTemperatureImage = (celsiusTemperature) => {
    if (celsiusTemperature <= 10) {
      return cold;
    } else if (celsiusTemperature > 10 && celsiusTemperature < 20) {
      return mild;
    } else {
      return sunny;
    }
  };
  // console.log(`Weather Main ${weatherMain}`);
  // console.log(`Weather Desc ${weatherDesc}`);
  // console.log(`Main Temperator ${celsiusMainTemp}`);

  return (
    <div>
      {isLoading && <p>Loading Items...</p>}
      {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}

      <figure>
        <img id="homeTown" src={grazCity} alt="The city of Graz" />
        <figcaption>I live in Graz, Austria.</figcaption>
      </figure>
      <p>Current weather in Graz: {mainTemp}&deg; celsius.</p>
      <ul>
        <li>Weather: {weatherMain} </li>
        <li>Weather Description: {weatherDesc} </li>
      </ul>
      <figure>
        <img id="weatherInTown" src={tempImage} alt="Weather in Graz" />
        <figcaption>Weather in Graz, Austria.</figcaption>
      </figure>
      {/* <p>{JSON.stringify(weather)}</p> */}
    </div>
  );
}

export default MyTown;
