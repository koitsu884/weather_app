import {getWeather, generateWeatherInfo} from '../apis/weather';
import { setLoading} from './commonActions';

import { 
    GET_WEATHER
} from './types';

export const getWeatherForCity = (cityName) => (dispatch, getState) => {
    const state = getState();
    const city = state.cities.find(city => city.cityName === cityName );
    if(city && !city.currentWeather){
        dispatch(setLoading());

        getWeather(cityName)
        .then(res => {
            let weatherInfo = generateWeatherInfo(res.data);
            weatherInfo.cityName = cityName;
             dispatch({
                type: GET_WEATHER,
                payload: weatherInfo
            })
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: GET_WEATHER,
                payload: null
            })
        });
    }
}


