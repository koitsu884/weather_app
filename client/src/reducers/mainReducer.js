import{ 
    GET_CITIES, 
    GET_WEATHER,
    SET_CITYINDEX, 
    SET_LOADING, 
    GET_TIME_INFO,
    DELETE_CITY,
    ADD_CITY,
    OPEN_CITY_MODAL,
    CLOSE_CITY_MODAL,
    GET_ERRORS
} from '../actions/types';

const initialState = {
    cities: [],
    selectedCityIndex: null,
    timeInfo: null,
    loading: false,
    errors: {},
    cityModalOpen: false,
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
        case ADD_CITY:
        console.log(action.payload);
            return {
                ...state,
                cities: [ action.payload, ...state.cities],
                errors: {},
                cityModalOpen: false
            }
        case DELETE_CITY:
            return {
                ...state,
                cities: state.cities.filter(city => city._id !== action.payload)
            }
        case OPEN_CITY_MODAL:
            return {
                ...state,
                cityModalOpen: true,
                errors:{}
            }
        case CLOSE_CITY_MODAL:
            return {
                ...state,
                cityModalOpen: false
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
                cityIndex = tempCities.findIndex(city => city.name === action.payload.cityName)
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
        case GET_ERRORS:
            return {
                ...state,
                errors: action.payload
            }
        default:
            return state;
    }
}