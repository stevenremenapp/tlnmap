import React, { Component } from 'react';
import ReactMapGL, {NavigationControl, Marker, Popup, FlyToInterpolator} from 'react-map-gl';
import Sidebar from './components/Sidebar';
import MapPin from './components/MapPin';
import Infowindow from './components/Infowindow';
import LIBRARIES from './data/libraries.json';
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css';
require('dotenv').config();

const MAPBOX_STYLE = 'mapbox://styles/mapbox/streets-v9';
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

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
      popupInfo: null
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

  _goToViewport = ({longitude, latitude}) => {
    this._onViewportChange({
      longitude,
      latitude,
      zoom: 14,
      transitionInterpolator: new FlyToInterpolator(),
      transitionDuration: 500
    });
  }

  _mapClickToCloseInfowindow = (event) => {
    // console.log(event.target.className);
    if (event.target.className === "overlays") {
      this.setState({popupInfo: null});
    }
  }

  _resize() {
    this._onViewportChange({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  _renderLibraryMarker = (library, index) => {
    return (
      <Marker
        key={`marker-${index}`}
        latitude={library.latitude}
        longitude={library.longitude}
      >
      <MapPin
        size={20}
        onMouseOver={() => this.setState({popupInfo: library})}
        // onMouseOut={() => this.setState({popupInfo: null})}
        onClick={() => this.setState({popupInfo: library})}
      />
      </Marker>
    );
  }

  _renderPopup() {
    const {popupInfo} = this.state;

    return popupInfo && (
      <Popup
        tipSize={5}
        anchor="top"
        latitude={popupInfo.latitude}
        longitude={popupInfo.longitude}
        onClose={() => this.setState({popupInfo: null})}
      >
      <Infowindow info={popupInfo} />
      </Popup>
    );
  }

  render() {
    return (
      <div id='outer-container'>
        <Sidebar
          pageWrapId={ "page-wrap" }
          onViewportChange={this._goToViewport}
          onLibraryClick={(library) => this.setState({popupInfo: library})}
        />
        <div id='page-wrap'>
          <ReactMapGL
            {...this.state.viewport}
            mapStyle={MAPBOX_STYLE}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            onViewportChange={viewport => this._onViewportChange(viewport)}
            onClick={event => this._mapClickToCloseInfowindow(event)}
            >

            { LIBRARIES.map(this._renderLibraryMarker) }

            {this._renderPopup()}

            <div className="nav">
              <NavigationControl
                onViewportChange={viewport => this._onViewportChange(viewport)}
                />
            </div>
            {/* <div className="menu"></div> */}
            </ReactMapGL>
        </div>
        </div>
    );
  }
}