import React, { Component } from 'react';
import ReactMapGL, {NavigationControl, Marker, Popup} from 'react-map-gl';
import MapPin from './MapPin';
import Infowindow from './Infowindow';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css';
require('dotenv').config();

const MAPBOX_STYLE = 'mapbox://styles/mapbox/streets-v9';
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

export default class Map extends Component {

  constructor(props) {
    super(props);
    this._resize = this._resize.bind(this);
  }
  
  // Attach and remove (below) resize event listener to window to update map/viewport state if user resizes
  componentDidMount() {
    window.addEventListener('resize', this._resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  // Call to parent viewport change to change viewport state based on current map data
  _onViewportChange = (viewport) => {
    this.props.onViewportChange(viewport);
  }

  // Close infowindow if user clicks outside of infowindow on the map without interacting with map
  _mapClickToCloseInfowindow = (event) => {
    if (event.target.className === "overlays") {
      this.props.closeInfowindow();
    }
  }

  _closeInfowindow = () => {
    this.props.closeInfowindow();
  }

  _openInfowindow = (library) => {
    this.props.openInfowindow(library);
  }

  // Update App.js viewport state for new window size if user resizes window
  _resize() {
    this.props.onViewportChange({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  // Render infowindow with correct info
  _renderPopup() {
    const popupInfo = this.props.popupInfo;

    return popupInfo && (
      <Popup
        tipSize={5}
        anchor="top"
        latitude={popupInfo.latitude}
        longitude={popupInfo.longitude}
        onClose={() => this._closeInfowindow()}
      >
      <Infowindow info={popupInfo} />
      </Popup>
    );
  }

  render() {
      return (
        <main
          role="application"
          aria-label="map of libraries in The Library Network"
          tabIndex="0"
        >
          <ReactMapGL          
            {...this.props.viewport}
            mapStyle={MAPBOX_STYLE}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            onViewportChange={viewport => this._onViewportChange(viewport)}
            onClick={event => this._mapClickToCloseInfowindow(event)}
            >

            {this.props.filteredLocations &&
                this.props.filteredLocations.map((library, index) => {
                    return (
                    <Marker
                      key={`marker-${index}`}
                      latitude={library.latitude}
                      longitude={library.longitude}
                      alt={library.name}
                    >
                    <MapPin
                      // size={20}
                      onMouseOver={() => this._openInfowindow(library)}
                      onClick={() => this._openInfowindow(library)}
                      popupInfo={this.props.popupInfo}
                      fill={(library.selected === "y" ? "red" : "blue")}
                    />
                    </Marker>
                    )
                })
            }

            {this._renderPopup()}

            <div className="map-nav">
              <NavigationControl
                onViewportChange={viewport => this._onViewportChange(viewport)}
                />
            </div>
          </ReactMapGL>
        </main>
      )
  }
}