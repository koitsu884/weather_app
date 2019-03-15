import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import CityList from './components/CityList';
import Weather from './components/Weather';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route exact path="/" component={CityList} />
          <Route exact path="/weather/:cityName/:country" component={Weather} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
