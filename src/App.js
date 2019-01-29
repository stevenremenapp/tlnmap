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
        zoom: 9,
        maxZoom: 17,
        bearing: 0,
        pitch: 0
      },
      sidebarOpen: false,
      popupInfo: null,
      all: LIBRARIES,
      filtered: null,
      hasError: false
    };
    this._openInfowindow = this._openInfowindow.bind(this);
    this._closeInfowindow = this._closeInfowindow.bind(this);
    this._handleSidebarStateChange = this._handleSidebarStateChange.bind(this);
    this._onViewportChange = this._onViewportChange.bind(this);
  }

  // Retrieve library data and set initial state

  componentDidMount = () => {
    this.setState({
      filtered: this._filterLocations(this.state.all, "")
    });

    // fetch('https://api.myjson.com/bins/p8xk6')
    //   .then(response => response.json())
    //   .then(libraryJSON => this.setState({all: libraryJSON, filtered: libraryJSON }))
    //   .catch(error => {
    //     alert("Unfortunately there was an error returning the data for this map. Please try again soon.")
    //   });
  }

  // Error checking for this and child components
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // Check if sidebar is open and if so move focus into the search input
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

  // Filter locations with each updated query
  _updateQuery = (query) => {
    this.setState({
      filtered: this._filterLocations(this.state.all, query)
    });
  }

  _filterLocations = (allLocations, query) => {
    return allLocations.filter(location => location.name.toLowerCase().includes(query.toLowerCase()));
  }

  // Return all locations to unselected, close infowindow, and return appropriate focus
  _closeInfowindow = () => {
    this.state.all.map(library => library.selected = "n");
    this.setState({ popupInfo: null }, function() {
      this._handleInfowindowFocus();
    });
  }

  // Select appropriate location marker, open infowindow, lock focus on infowindow and allow user to press enter to close infowindow
  _openInfowindow = (library) => {
    this.state.all.map(library => library.selected = "n");
    library.selected = "y";
    this.setState({ popupInfo: library }, function() {
      this._handleInfowindowFocus();
      document.querySelector('.mapboxgl-popup-content button').addEventListener("keydown", 
        function(event) {
          if (event.keyCode === 13) {
            this._closeInfowindow();
          }
      }.bind(this));
    });
  }

  // Handle infowindow lock focus when open and when closed
  _handleInfowindowFocus = () => {
    if (this.state.popupInfo) {
      document.querySelector('.mapboxgl-popup-content button').focus();
    }
    if (!this.state.popupInfo && this.state.sidebarOpen === true) {
      document.getElementById('search-input').focus();
    }
  }

  // Update viewport state data when map is changed by user
  _onViewportChange = (viewport) => {
    this.setState({
      viewport: {...this.state.viewport, ...viewport}
    });
}

  // Zoom into marker when location is selected from sidebar list
  _goToViewport = ({longitude, latitude}) => {
    this._onViewportChange({
      longitude,
      latitude,
      zoom: 14,
      transitionInterpolator: new FlyToInterpolator(),
      transitionDuration: 1000
    });
  }

  // Check for error, then render component
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong!</h1>;
    }
    
    return (
      <div>
        <Sidebar
          onViewportChange={this._goToViewport}
          openInfowindow={this._openInfowindow}
          allLocations={this.state.all}
          filteredLocations={this.state.filtered}
          filterLocations={this._updateQuery}
          isOpen={this.state.sidebarOpen}
          handleSidebarStateChange={this._handleSidebarStateChange}
        />
          <Map
            viewport={this.state.viewport}
            onViewportChange={this._onViewportChange}
            popupInfo={this.state.popupInfo}
            openInfowindow={this._openInfowindow}
            closeInfowindow={this._closeInfowindow}
            allLocations={this.state.all}
            filteredLocations={this.state.filtered}
          ></Map>
        </div>
    );
  }
}