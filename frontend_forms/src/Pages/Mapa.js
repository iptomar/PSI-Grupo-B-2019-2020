import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {  NavLink } from 'react-router-dom';
 
export class Mapa extends Component {
  render() {
    return (
        <Map google={this.props.google} zoom={14} initialCenter={{
          lat: 39.605381,
          lng: -8.404312
          }}>
          <Marker onClick={this.onMarkerClick} name={'Current location'} />
        </Map>
    
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ("AIzaSyD_tfD5eh6wl21Ht8np0D8rvsBtnCrfBxY")
})(Mapa)
