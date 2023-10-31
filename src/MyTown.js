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
  const [mainFahrenhietTemp, setMainFahrenhietTemp] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);

  const CONVERSTION_FACTOR = 273.15;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // fetch data from the weather api
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did not receive expected data");
        const weatherData = await response.json();
        const mainTemperator = weatherData["main"].temp;

        // convert temperature from kelvin to celsius and fahrenheit
        const celsiusMainTemp = parseFloat(
          convertKelvinTempToCelsius(mainTemperator)
        ).toFixed(2);

        const fahrenheitTemp = parseFloat(
          convertCelsiusToFahreheit(celsiusMainTemp)
        ).toFixed(2);

        // set values to be displayed
        setWeatherMain(weatherData["weather"][0].main);
        setWeatherDesc(weatherData["weather"][0].description);
        setMainTemp(celsiusMainTemp);
        setMainFahrenhietTemp(fahrenheitTemp);
        setTempImage(getTemperatureImage(celsiusMainTemp));
        setFetchError(null);
      } catch (err) {
        console.log(err.stack);
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  const convertKelvinTempToCelsius = (kelvinTemperature) => {
    return kelvinTemperature - CONVERSTION_FACTOR;
  };

  const convertCelsiusToFahreheit = (celsiusTemperature) => {
    return celsiusTemperature * (9 / 5) + 32;
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
  return (
    <div>
      {isLoading && <p>Loading Items...</p>}
      {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
      {!fetchError && !isLoading && (
        <div>
          <figure>
            <img id="homeTown" src={grazCity} alt="The city of Graz" />
            <figcaption>I live in Graz, Austria.</figcaption>
          </figure>
          {isCelsius && (
            <p>
              Current temperature in Graz:
              <strong>{mainTemp}&deg; </strong> Celsius.
            </p>
          )}
          {!isCelsius && (
            <p>
              Current temperature in Graz:
              <strong> {mainFahrenhietTemp}&deg; </strong>Fahrenheit.
            </p>
          )}
          <ul>
            <li>Weather: {weatherMain} </li>
            <li>Weather Description: {weatherDesc} </li>
          </ul>
          <figure>
            <img id="weatherInTown" src={tempImage} alt="Weather in Graz" />
            <figcaption>Weather in Graz, Austria.</figcaption>
          </figure>
          <div>
            <button
              type="submit"
              arial-label="Convert temperature"
              onClick={() => {
                setIsCelsius(!isCelsius);
              }}
            >
              {isCelsius ? <p>Change to &deg;F</p> : <p>Change to &deg;C</p>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyTown;
