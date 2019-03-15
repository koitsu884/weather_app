import axios from 'axios';

import { 
    GET_CITIES, DELETE_CITY
} from './types';

export const getCities = () => dispatch => {
    axios
        .get('/api/cities')
        .then(res => {
            // console.log(res);
            let cityList = res.data.map((city) => {
                return {id:city._id, cityName:city.name, country: city.country, currentWeather: null}
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