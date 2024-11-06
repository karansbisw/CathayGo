import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapComponent = ({ userLocation, onSelectLocation }) => {
  const locations = [
    {
      id: 1,
      name: "Location 1",
      coordinates: { lat: 22.338288864740818, lng: 114.17449857413632 },
    },
    {
      id: 2,
      name: "Location 2",
      coordinates: { lat: 34.0522, lng: -118.2437 },
    },
  ];

  const handleMarkerClick = (location) => {
    onSelectLocation(location);
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBjlFso7gIEgHMWMEZc0Dp9T8ZnEvy7">
      <GoogleMap
        mapContainerStyle={{ width: "500px", height: "500px" }}
        center={userLocation}
        zoom={10}
      >
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={location.coordinates}
            onClick={() => handleMarkerClick(location)}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
