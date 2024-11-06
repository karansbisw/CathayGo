import MapComponent from "../MapComponent";
import { useState } from "react";
import "./BottomNavbar.css";

const Screen = () => {
  const [screen, setScreen] = useState(0);
  // const screen = 0;
  return (
    <div>
      {(() => {
        switch (screen) {
          case 0:
            return <MapComponent />;
          case 1:
            return <p>NULL</p>;
          case 2:
            return <MapComponent />;
          case 3:
            return <MapComponent />;
          default:
            return <p>NULL</p>;
        }
      })()}
      <div className="bottom-navbar">
        <a className="nav-item" onClick={() => setScreen(0)}>
          Home
        </a>
        <a className="nav-item" onClick={() => setScreen(1)}>
          Search
        </a>
        <a className="nav-item" onClick={() => setScreen(2)}>
          Notifications
        </a>
        <a className="nav-item" onClick={() => setScreen(3)}>
          Profile
        </a>
      </div>
    </div>
  );
};

export default Screen;
