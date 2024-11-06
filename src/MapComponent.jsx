import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "100%",
};

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      searchLocation: null,
      currentLocation: { lat: 22.2988, lng: 114.1722 },
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
    this.autocomplete = null;
  }

  componentDidMount() {
    const { google } = this.props;
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      { types: ["geocode"] }
    );
    this.autocomplete.addListener("place_changed", this.handlePlaceSelect);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.setState({ currentLocation });
        },
        (error) => console.error(error)
      );
    }
  }

  handlePlaceSelect = () => {
    const place = this.autocomplete.getPlace();
    if (place.geometry) {
      this.setState({
        searchLocation: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
        showingInfoWindow: true,
        selectedPlace: place,
        activeMarker: null,
      });
    }
  };

  handleSuggestionClick = (suggestion) => {
    let coordinates;
    let placeName;
    switch (suggestion) {
      case "hotel":
        coordinates = { lat: 22.302711, lng: 114.177216 };
        placeName = "Hotel";
        break;
      case "retail":
        coordinates = { lat: 22.280847, lng: 114.158917 };
        placeName = "Retail";
        break;
      case "lifestyle":
        coordinates = { lat: 22.319303, lng: 114.169361 };
        placeName = "Lifestyle";
        break;
      case "dining":
        coordinates = { lat: 22.28552, lng: 114.15769 };
        placeName = "Dining";
        break;
      default:
        coordinates = this.state.currentLocation;
        placeName = "Current Location";
    }

    this.setState({
      searchTerm: suggestion,
      searchLocation: coordinates,
      showingInfoWindow: false,
      activeMarker: null,
      selectedPlace: { name: placeName },
    });
  };

  onMarkerClick = (props, marker) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  onMapClicked = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    const {
      searchLocation,
      currentLocation,
      showingInfoWindow,
      selectedPlace,
    } = this.state;

    return (
      <div style={{ position: "relative", height: "100vh" }}>
        <input
          id="autocomplete"
          type="text"
          style={{ width: "400px", backgroundColor: "#ffffff" }}
        />
        <div>
          <button
            onClick={() => this.handleSuggestionClick("hotel")}
            style={{ backgroundColor: "#ffffff", color: "#000000" }}
          >
            Hotel
          </button>
          <button
            onClick={() => this.handleSuggestionClick("retail")}
            style={{ backgroundColor: "#ffffff", color: "#000000" }}
          >
            Retail
          </button>
          <button
            onClick={() => this.handleSuggestionClick("lifestyle")}
            style={{ backgroundColor: "#ffffff", color: "#000000" }}
          >
            Lifestyle
          </button>
          <button
            onClick={() => this.handleSuggestionClick("dining")}
            style={{ backgroundColor: "#ffffff", color: "#000000" }}
          >
            Dining
          </button>
        </div>
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={searchLocation || currentLocation}
          onClick={this.onMapClicked}
        >
          {searchLocation && (
            <Marker
              position={searchLocation}
              onClick={this.onMarkerClick}
              name={this.state.searchTerm}
            />
          )}
          <Marker
            position={currentLocation}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            }}
            onClick={this.onMarkerClick}
            name={"Current Location"}
          />
        </Map>

        {/* Slide-Up Info Panel */}
        <div
          style={{
            position: "fixed",
            bottom: showingInfoWindow ? "0" : "-100px",
            left: 0,
            right: 0,
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "0 -2px 10px rgba(0,0,0,0.3)",
            borderRadius: "10px 10px 0 0",
            transition: "bottom 0.3s ease-in-out",
            textAlign: "center",
          }}
        >
          <h4>{selectedPlace.name || "Location"}</h4>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBjlFso7gIEgHMWMEZc0Dp9T8ZnEvy7-XY",
})(MapContainer);
