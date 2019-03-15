import axios from 'axios';

import { 
    GET_CITIES, DELETE_CITY, OPEN_CITY_MODAL, CLOSE_CITY_MODAL, ADD_CITY, GET_ERRORS
} from './types';

export const getCities = () => dispatch => {
    axios
        .get('/api/cities')
        .then(res => {
            // console.log(res);
            let cityList = res.data.map((city) => {
                return {_id:city._id, name:city.name, country: city.country, currentWeather: null}
            })
            // console.log(cityList);
            dispatch({
                type: GET_CITIES,
                payload: cityList
            })
        })
        .catch(err => console.log(err));
}

export const deleteCity = (id) => dispatch => {
    axios
        .delete(`/api/cities/${id}`)
        .then(res => {
            dispatch({
                type: DELETE_CITY,
                payload: id
            })
        })
        .catch( err => console.log(err))

}

export const addCity = (cityData) => dispatch => {
    axios
        .post('/api/cities', cityData)
        .then(res => {
            dispatch(closeCityModal);
            dispatch({
                type: ADD_CITY,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

export const openCityModal = () => {
    return {
        type: OPEN_CITY_MODAL
    }
}

export const closeCityModal = () => {
    return {
        type: CLOSE_CITY_MODAL
    }
}