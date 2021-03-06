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
      filter: {
        query: '',
        reciprocalBorrower: false,
        sharedSystem: false,
        miLibraryCard: false,
        mel: false
      },
      hasError: false
    };
    // this._openInfowindow = this._openInfowindow.bind(this);
    // this._closeInfowindow = this._closeInfowindow.bind(this);
    // this._handleSidebarStateChange = this._handleSidebarStateChange.bind(this);
    // this._onViewportChange = this._onViewportChange.bind(this);
    // this._handleQueryChange = this._handleQueryChange.bind(this);
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
  // _updateQuery = (newQuery, isReciprocalBorrowerChecked) => {
  //   this.setState({
  //     filtered: this._filterLocations(this.state.all, newQuery, isReciprocalBorrowerChecked)
  //   });
  // }

  _handleQueryChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    const name = event.target.name;
    this.setState({
      // query: newQuery,
      // reciprocalBorrower: isReciprocalBorrowerChecked
      // [name]: value
      filter: {...this.state.filter, [name]: value}
    }, () => {
      console.log(this.state.filter);
      console.log(this.state.filter.reciprocalBorrower);
      // console.log(this.state.sharedSystem);
      this.setState({
        filtered: this._filterLocations(this.state.all)
      })
    })
  }

  _filterLocations = (allLocations) => {
    let filter = this.state.filter;
    // return allLocations.filter(location =>
    //   location.name.toLowerCase().includes(filter.query.toLowerCase())
    //   && location.reciprocalBorrower === filter.reciprocalBorrower)
    // };
    let filtered = allLocations.filter(location => {
      // Check each filter, kick out of array if not meeting requirement
      if (!location.name.toLowerCase().includes(filter.query.toLowerCase())) {
        return false;
      }
      if (filter.reciprocalBorrower && !location.reciprocalBorrower) {
        return false;
      }
      if (filter.sharedSystem && !location.sharedSystem) {
        return false;
      }
      if (filter.miLibraryCard && !location.miLibraryCard) {
        return false;
      }
      if(filter.mel && !location.mel) {
        return false;
      }
      return true;
    });
    return filtered;
    }
    // let query = this.state.query;
    // let rB = this.state.reciprocalBorrower;
    // let sS = this.state.sharedSystem;
    // if (query !== "" && rB) {
    //   return allLocations.filter(location => location.name.toLowerCase().includes(query.toLowerCase()) && location.reciprocalBorrower === "y");
    // }
    // if (sS) {
    //   return allLocations.filter(location => location.sharedSystem === "y");
    // }
    // if (rB) {
    //   return allLocations.filter(location => location.reciprocalBorrower === "y");
    // }
    // if (query !== "") {
    //   return allLocations.filter(location => location.name.toLowerCase().includes(query.toLowerCase()));
    // }
    // else {
    //   return allLocations;
    // }}

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
          isOpen={this.state.sidebarOpen}
          handleSidebarStateChange={this._handleSidebarStateChange}
          // filterReciprocal={this._updateReciprocal}
          query={this.state.query}
          onQueryChange={this._handleQueryChange}
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