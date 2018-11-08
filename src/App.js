import React, { Component } from 'react';
import {FlyToInterpolator} from 'react-map-gl';
import Sidebar from './components/Sidebar';
import Map from './components/Map';
import LIBRARIES from './data/libraries.json';
import './App.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        latitude: 42.473091,
        longitude: -83.221076,
        zoom: 10,
        maxZoom: 17,
        bearing: 0,
        pitch: 0
      },
      sidebarOpen: false,
      popupInfo: null,
      all: LIBRARIES,
      filtered: null
    };
  }

  componentDidMount = () => {
    this.setState({
      // ...this.state,
      filtered: this._filterLocations(this.state.all, "")
    });
  }

  _handleSidebarStateChange = (state) => {
    this.setState({ sidebarOpen: state.isOpen }, function() {
      this._handleSidebarFocus();
    });
  }

  _handleSidebarFocus = () => {
    if (this.state.sidebarOpen === true) {
      document.getElementById('search-input').focus();
  }
  }

  _updateQuery = (query) => {
    this.setState({
      // ...this.state,
      filtered: this._filterLocations(this.state.all, query)
    });
  }

  _filterLocations = (allLocations, query) => {
    return allLocations.filter(location => location.name.toLowerCase().includes(query.toLowerCase()));
  }

  _closeInfowindow = () => {
    LIBRARIES.map(library => library.selected = "n");
    this.setState({ popupInfo: null });
  }

  _openInfowindow = (library) => {
    LIBRARIES.map(library => library.selected = "n");
    library.selected = "y";
    this.setState({ popupInfo: library }, function() {
      this._handleInfowindowFocus();
    });
  }

  _handleInfowindowFocus = () => {
    document.querySelector('.mapboxgl-popup-content button').focus();
  }

  _onViewportChange = (viewport) => {
    this.setState({
      viewport: {...this.state.viewport, ...viewport}
    });
}

  _goToViewport = ({longitude, latitude}) => {
    this._onViewportChange({
      longitude,
      latitude,
      zoom: 14,
      transitionInterpolator: new FlyToInterpolator(),
      transitionDuration: 1000
    });
  }

  render() {
    return (
      <div>
        <Sidebar
          onViewportChange={this._goToViewport}
          openInfowindow={this._openInfowindow.bind(this)}
          allLocations={this.state.all}
          filteredLocations={this.state.filtered}
          filterLocations={this._updateQuery}
          isOpen={this.state.sidebarOpen}
          handleSidebarStateChange={this._handleSidebarStateChange.bind(this)}
        />
          <Map
            viewport={this.state.viewport}
            onViewportChange={this._onViewportChange.bind(this)}
            popupInfo={this.state.popupInfo}
            openInfowindow={this._openInfowindow.bind(this)}
            closeInfowindow={this._closeInfowindow.bind(this)}
            allLocations={this.state.all}
            filteredLocations={this.state.filtered}
          ></Map>
        </div>
    );
  }
}