import React, { Component } from 'react';
import ReactMapGL, {NavigationControl, Marker, Popup} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css';
require('dotenv').config();

const MAPBOX_STYLE = 'mapbox://styles/mapbox/streets-v9';
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
}

const markerStyle = {
  position: 'absolute',
  padding: '5px',
  background: 'blue',
  fontSize: '10px'
}

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        longitude: -83.0458,
        latitude: 42.3314,
        zoom: 11,
        maxZoom: 16
      }
    };
    this._resize = this._resize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
    // console.log(process.env);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  _onViewportChange(viewport) {
    this.setState({
      viewport: {...this.state.viewport, ...viewport}
    });
  }

  _resize() {
    this._onViewportChange({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        mapStyle={MAPBOX_STYLE}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onViewportChange={viewport => this._onViewportChange(viewport)}
        >
        <div style={navStyle}>
          <NavigationControl
            onViewportChange={viewport => this._onViewportChange(viewport)}
            />
        </div>
        <Marker latitude={42.414752} longitude={-83.289607} offsetTop={-30}>
          <div style={markerStyle}>You are here</div>
        </Marker>
        <Popup latitude={42.414752} longitude={-83.289607} closeButton={true} closeOnClick={true} anchor="top" tipSize={5}>
          <div>
            This is the RTDL
          </div>
        </Popup>
        </ReactMapGL>
    );
  }
}