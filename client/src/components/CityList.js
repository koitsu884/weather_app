import React, { Component } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getCities,
  deleteCity,
  openCityModal,
  closeCityModal,
  addCity
} from "../actions/cityActions";
import TextFieldGroup from "./common/TextFieldGroup";

Modal.setAppElement("#root");

const customStyles = {
  overlay: {
    zIndex: "100",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: "0",
    transform: "translate(-50%, -50%)"
  }
};

class CityList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // modalIsOpen: false,
      name: "",
      country: "",
      errors: {}
    };
  }

  openModal = () => {
    this.props.openCityModal();
  };

  afterOpenModal = () => {
  };

  closeModal = () => {
    this.props.closeCityModal();
  };

  componentDidMount() {
    this.props.getCities();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    // if(!nextProps.cityModalOpen){
    //   this.setState({ modalIsOpen: false})
    // }
  }

  onDeleteClick = id => {
    if (window.confirm("Are you sure to delete the city?")) {
      this.props.deleteCity(id);
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const newCity = {
      name: this.state.name,
      country: this.state.country
    };

    this.props.addCity(newCity);
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  renderTableBody(cities) {
    if (!cities) return;
    return cities.map(city => {
      return (
        <tr key={city._id}>
          <td>
            <Link to={`weather/${city.name}/${city.country}`}>{city.name}</Link>
          </td>
          <td>{city.country}</td>
          <td>
            <button
              onClick={() => this.onDeleteClick(city._id)}
              type="button"
              className="btn btn-danger btn-sm"
            >
              <i className="fas fa-trash" />
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    const { cities, errors } = this.props;

    return (
      <div className="citylist">
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th>City Name</th>
              <th>Country</th>
              <th>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={this.openModal}
                >
                  Add city
                </button>
              </th>
            </tr>
          </thead>
          <tbody>{this.renderTableBody(cities)}</tbody>
        </table>
        <Modal
          isOpen={this.props.cityModalOpen}
          onRequestClose={this.closeModal}
          onAfterOpen={this.afterOpenModal}
          style={customStyles}
        >
          <h3>Create City</h3>
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="name"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              error={errors.name}
            />
            <TextFieldGroup
              placeholder="country"
              name="country"
              value={this.state.country}
              onChange={this.onChange}
              error={errors.country}
            />
            {errors.db && <div className="text-danger">{errors.db}</div>}
            <input type="submit" className="btn btn-info mt-4" />
            <button
              type="button"
              className="btn btn-danger mt-4"
              onClick={this.closeModal}
            >
              Cancel
            </button>
          </form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cities: state.cities,
  errors: state.errors,
  cityModalOpen: state.cityModalOpen
});

export default connect(
  mapStateToProps,
  { getCities, deleteCity, openCityModal, closeCityModal, addCity }
)(CityList);
