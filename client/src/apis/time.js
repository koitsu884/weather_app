/*============================================================
 Using Woeld Weather Online (https://www.worldweatheronline.com)
==============================================================*/
const axios = require('axios');
const KEY = require('./keys').time;

export const getCurrentTime = (cityName, country) => {
    return axios.get(`https://api.worldweatheronline.com/premium/v1/tz.ashx?key=${KEY}&q=${cityName},${country}&format=json`);
} 

export const generateTimeInfo = data => {
    return data ? {
        currentTime: data.data.time_zone[0].localtime,
        gmtPlus: data.data.time_zone[0].utcOffset,
        zone: data.data.time_zone[0].zone,
    } : null;
}


