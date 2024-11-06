// CustomInfoWindow.js
import React from "react";
import { InfoWindow } from "google-maps-react";

const CustomInfoWindow = ({ marker, visible, placeName }) => {
  if (!visible || !marker) return null;

  return (
    <InfoWindow marker={marker} visible={visible}>
      <div>
        <h4>{placeName || "Location"}</h4>
      </div>
    </InfoWindow>
  );
};

export default CustomInfoWindow;
