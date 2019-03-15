import React, { Component } from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import { getCities, deleteCity } from "../actions/cityActions";

class CityList extends Component {
  componentDidMount() {
    this.props.getCities();
  }

  onDeleteClick = (id) => {
    if (window.confirm('Are you sure to delete the city?'))
    {
      this.props.deleteCity(id);
    }
  }

  renderTableBody(cities) {
      if(!cities)
        return;
    return cities.map(city => {
      return (
        <tr key={city.id}>
          <td><Link to={`weather/${city.cityName}/${city.country}`}>{city.cityName}</Link></td>
          <td>{city.country}</td>
          <td>
            <button onClick={() => this.onDeleteClick(city.id)} type="button" className="btn btn-danger btn-sm">
                <i className="fas fa-trash" />
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    const { cities} = this.props;

    return (
      <div className="citylist">
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th>City Name</th>
              <th>Country</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.renderTableBody(cities)}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cities: state.cities
});

export default connect(
  mapStateToProps,
  { getCities, deleteCity }
)(CityList);
