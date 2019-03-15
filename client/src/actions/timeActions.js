import { getCurrentTime, generateTimeInfo } from "../apis/time";
import { GET_TIME_INFO } from "./types";

export const getCurrentTimeForCity = (cityName, country) => dispatch => {
  getCurrentTime(cityName, country)
    .then(res => {
      let timeInfo = generateTimeInfo(res.data);
      dispatch({
        type: GET_TIME_INFO,
        payload: timeInfo
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_TIME_INFO,
        payload: null
      });
    });
};
