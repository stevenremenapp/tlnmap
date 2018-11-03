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

  _updateQuery = (query) => {
    this.setState({
      // ...this.state,
      selectedIndex: null,
      filtered: this._filterLocations(this.state.all, query)
    });
  }

  _filterLocations = (locations, query) => {
    return locations.filter(location => location.name.toLowerCase().includes(query.toLowerCase()));
  }

  _closeInfowindow = () => {
    this.setState({
      popupInfo: null
    });
  }

  _openInfowindow = (library) => {
    this.setState({
      popupInfo: library
    });
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
      transitionDuration: 500
    });
  }

  render() {
    return (
      <div id='outer-container'>
        <Sidebar
          pageWrapId={ "page-wrap" }
          onViewportChange={this._goToViewport}
          openInfowindow={this._openInfowindow.bind(this)}
          locations={this.state.filtered}
          filterLocations={this._updateQuery}
        />
        <div id='page-wrap'>
          <Map
            viewport={this.state.viewport}
            onViewportChange={this._onViewportChange.bind(this)}
            popupInfo={this.state.popupInfo}
            openInfowindow={this._openInfowindow.bind(this)}
            closeInfowindow={this._closeInfowindow.bind(this)}
          ></Map>
        </div>
        </div>
    );
  }
}