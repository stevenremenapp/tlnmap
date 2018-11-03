import React, { Component } from 'react';
import ReactMapGL, {NavigationControl, Marker, Popup} from 'react-map-gl';
import MapPin from './MapPin';
import Infowindow from './Infowindow';
import LIBRARIES from '../data/libraries.json';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css';
require('dotenv').config();

const MAPBOX_STYLE = 'mapbox://styles/mapbox/streets-v9';
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

export default class Map extends Component {

    componentDidMount() {
      window.addEventListener('resize', this._resize.bind(this));
      // this._resize();
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this._resize.bind(this));
    }

    _onViewportChange = (viewport) => {
      this.props.onViewportChange(viewport);
    }

    _mapClickToCloseInfowindow = (event) => {
      if (event.target.className === "overlays") {
        this.props.closeInfowindow();
      }
    }

    _openInfowindow = (library) => {
      this.props.openInfowindow(library);
    }

    _resize() {
      this.props.onViewportChange({
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
          onMouseOver={() => this._openInfowindow(library)}
          // onMouseOut={() => this.setState({popupInfo: null})}
          onClick={() => this._openInfowindow(library)}
        />
        </Marker>
      );
    }

    _renderPopup() {
      const popupInfo = this.props.popupInfo;

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
          <ReactMapGL
          {...this.props.viewport}
          mapStyle={MAPBOX_STYLE}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onViewportChange={viewport => this._onViewportChange(viewport)}
          onClick={event => this._mapClickToCloseInfowindow(event)}
          >

          { LIBRARIES.map(this._renderLibraryMarker) }

          {this._renderPopup()}

          <div className="map-nav">
            <NavigationControl
              onViewportChange={viewport => this._onViewportChange(viewport)}
              />
          </div>
          </ReactMapGL>
        )
    }
}