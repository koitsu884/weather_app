import{ 
    GET_CITIES, 
    GET_WEATHER,
    SET_CITYINDEX, 
    SET_LOADING, 
    GET_TIME_INFO,
    DELETE_CITY
} from '../actions/types';

const initialState = {
    cities: [],
    selectedCityIndex: null,
    timeInfo: null,
    loading: false
}

export default function(state = initialState, action){
    let tempCities;
    let cityIndex;
    switch(action.type){
        case GET_CITIES:
            return {
                ...state,
                cities: action.payload,
                selectedCityIndex: null
            }
        case DELETE_CITY:
            return {
                ...state,
                cities: state.cities.filter(city => city.id !== action.payload)
            }
        case SET_CITYINDEX:
            return {
                ...state,
                selectedCityIndex: action.payload
            }
        case GET_WEATHER:
            tempCities = [...state.cities];
            cityIndex = null;
            if(action.payload)
            {
                cityIndex = tempCities.findIndex(city => city.cityName === action.payload.cityName)
                if(cityIndex){
                    tempCities[cityIndex].currentWeather = action.payload;
                }
            }
            return {
                ...state,
                cities: tempCities,
                selectedCityIndex: cityIndex,
                loading: false
            }
        case GET_TIME_INFO:
            return {
                ...state,
                timeInfo: action.payload
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}