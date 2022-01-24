import React from "react";
import "./App.css";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import MapboxDraw from "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import Styles from "./components/Styles";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

class App extends React.Component {
  componentDidMount() {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-73.985664, 40.748514],
      zoom: 12,
    });

    const Directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
      profile: "mapbox/driving",
    });

    const Draw = new MapboxDraw();

    // Directions
    map.addControl(Directions, "top-left");

    // Draw
    map.addControl(Draw, "top-right");

    // Navigation
    map.addControl(new mapboxgl.NavigationControl());
  }

  render() {
    return (
      <div className="mapWrapper" id="map">
        <Styles />
      </div>
    );
  }
}
export default App;
