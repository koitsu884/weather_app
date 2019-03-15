/*============================================================
 Using Open Weather Map (https://openweathermap.org/)
==============================================================*/
const axios = require('axios');
const KEY = require('./keys').weather;

export const getWeather = cityName => {
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${KEY}&units=metric`);
} 

export const generateWeatherInfo = data => {
    return data ? {
        description: data.weather[0].description,
        temp: data.main.temp,
        temp_min: data.main.temp_min,
        temp_max: data.main.temp_max,
        humidity: data.main.humidity,
        icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
    } : null;
}
