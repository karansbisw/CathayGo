import React, { useState, useEffect } from "react";
import MapComponent from "./MapComponent";
import ARMap from "./ARMap";

const App = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div>
      <h1>Navigation Map</h1>
      {selectedLocation ? (
        <ARMap location={selectedLocation} />
      ) : userLocation ? (
        <MapComponent
          userLocation={userLocation}
          onSelectLocation={handleSelectLocation}
        />
      ) : (
        <p>Loading user location...</p>
      )}
    </div>
  );
};

export default App;
