import React, {Component} from 'react';
import { get } from 'axios';
import logo from '../static/images/logo_icon.png';
import '../static/scss/layout/MapComponent.css';

let prevInfoWindow = false;

class Map extends Component {

    constructor() {
        super();
        this.markers = [];
    }

    static defaultProps = {
        propertiesByCity: [],
    }

    componentDidMount() {
        this.map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            fullscreenControl: false,
        });

        if (this.props.propertiesByCity) {
            this.props.propertiesByCity.forEach((x) => {
                this.addMarkerInMap({...x});
            });
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.propertiesByCity.length !== this.props.propertiesByCity.length) {
            this.markers.forEach((x) => {
                x.setMap(null);
            });
            this.markers = [];
            nextProps.propertiesByCity.forEach((property) => {
                this.addMarkerInMap(property);
            });
        }

    }

    onClick = (propertyId) => {
        let data = {};
        let position = '';
        this.props.propertiesByCity.forEach((x, i) => {
            if (x.propertyId === propertyId) {
                data = x;
                position = i;
            }
        });
        this.props.tableData(data, position);
    }

    addMarkerInMap = (property) => {
        const {address, city, state, zipCode, propertyId} = property;
        const map = this.map;
        const that = this;
        const api = `https://maps.googleapis.com/maps/api/geocode/json?address=${ address || '' }, ${ city || '' },${ state || '' },${ zipCode || '' }&key=AIzaSyDy8pceF8BE2QI0tPNzd0uyhDAucdw1Fm8`;
        get(api).then((result) => {
            const data = result.data && result.data.results && result.data.results[0];
            if (data && data.geometry && data.geometry.location) {
                const pos = data.geometry.location;
                const contentString =
                        `<div id="content">
                            <table>
                            <tr><td>Address:</td><td>${address}</td></tr></tr>
                            <tr><td>city:</td><td>${city}</td></tr></tr>
                            <tr><td>state:</td><td>${state}</td></tr></tr>
                            <tr><td>zipCode:</td><td>${zipCode}</td></tr></tr>
                            </table>
                        </div>`;

                const infowindow = new window.google.maps.InfoWindow({
                    content: contentString,
                });
                const image = {
                    url: logo,
                    size: new window.google.maps.Size(20, 20),
                };
                const marker = new window.google.maps.Marker({
                    position: pos,
                    icon: image,
                    map: map,
                });
                marker.addListener('click', () => {
                    if (prevInfoWindow) {
                        prevInfoWindow.close();
                    }
                    prevInfoWindow = infowindow;
                    that.onClick(propertyId);
                    infowindow.open(map, marker);
                });
                map.setCenter(pos);
                this.markers.push(marker);
            }
        });

    }

    render() {
        return <div id="map"/>;
    }
}

export default Map;
