import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getWeatherForCity } from "../actions/weatherActions";
import { getCurrentTimeForCity } from "../actions/timeActions";

class Weather extends Component {
  componentDidMount() {
    const { cityName, country } = this.props.match.params;
    if (cityName) {
      this.props.getWeatherForCity(cityName);
      this.props.getCurrentTimeForCity(cityName, country);
    } else {
      console.log("No city name..??");
    }
  }

  renderCityInfo() {
    const { cityInfo } = this.props;
    if (!cityInfo || !cityInfo.currentWeather) {
      const displayText = this.props.loading
        ? "Loading..."
        : "Sorry, we could not find the information the city..";
      return (
        <div>
          <p>{displayText}</p>
        </div>
      );
    }

    return (
      <div className="card">
        <div className="card-header">
          {cityInfo.name} - {cityInfo.country}
        </div>
        <div className="card-body">
          <h5>Current Weather: {cityInfo.currentWeather.description}</h5>
          <img src={cityInfo.currentWeather.icon} alt={cityInfo.currentWeather.description} />
          <h5>Temp</h5>
          <p>Current: {cityInfo.currentWeather.temp}</p>
          <p>Min: {cityInfo.currentWeather.temp_min}</p>
          <p>Max: {cityInfo.currentWeather.temp_max}</p>
        </div>
      </div>
    );
  }

  renderTimeInfo() {
    const { timeInfo } = this.props;
    if (!timeInfo) return;
    const gmtStr = (timeInfo.gmtPlus >= 0 ? "+" : "-") + timeInfo.gmtPlus;
    return (
      <div className="alert alert-warning">
        <p>
          <strong>Current time: </strong>
          {timeInfo.currentTime} (GMT:{gmtStr})
        </p>
      </div>
    );
  }

  render() {
    return (
      <div className="Weather">
        {this.renderCityInfo()}
        {this.renderTimeInfo()}
        <Link className="btn btn-primary" to={"/"}>
          Back to List
        </Link>
      </div>
    );
  }
}

const mapStateToProp = state => ({
  cityInfo: state.cities[state.selectedCityIndex],
  timeInfo: state.timeInfo,
  loading: state.loading
  // cities: state.cities,
  // selectedCityIndex: state.selectedCityIndex
});

export default connect(
  mapStateToProp,
  { getWeatherForCity, getCurrentTimeForCity }
)(Weather);
