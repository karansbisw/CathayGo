import React, { useEffect, useRef } from "react";
import "aframe";
import "aframe-ar";

const ARMap = ({ location }) => {
  const sceneRef = useRef(null);

  useEffect(() => {
    const sceneEl = sceneRef.current;
    return () => {
      if (sceneEl && sceneEl.parentNode) {
        sceneEl.parentNode.removeChild(sceneEl);
      }
    };
  }, []);

  return (
    <a-scene ref={sceneRef} embedded arjs="sourceType: webcam;">
      <a-marker preset="hiro">
        <a-box position="0 0.5 0" material="color: yellow;"></a-box>
        <a-text
          value={`Location: ${location.coordinates.lat}, ${location.coordinates.lng}`}
          position="0 1 0"
        ></a-text>
      </a-marker>
      <a-entity camera></a-entity>
    </a-scene>
  );
};

export default ARMap;
