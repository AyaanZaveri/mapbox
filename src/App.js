import React from "react";
import "./App.css";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import {
  RulerControl,
  StylesControl,
  CompassControl,
  ZoomControl,
} from "mapbox-gl-controls";
import "mapbox-gl-controls/lib/controls.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

class App extends React.Component {
  componentDidMount() {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-73.985664, 40.748514],
      zoom: 12,
    });

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
      profile: "mapbox/driving",
    });

    // Directions
    map.addControl(directions, "top-left");

    // Ruler
    map.addControl(new RulerControl(), "top-right");
    map.on("ruler.on", () => console.log("ruler: on"));
    map.on("ruler.off", () => console.log("ruler: off"));

    // Styles
    map.addControl(
      new StylesControl({
        styles: [
          {
            label: "Streets",
            styleName: "Mapbox Streets",
            styleUrl: "mapbox://styles/mapbox/streets-v11",
          },
          {
            label: "Satellite",
            styleName: "Satellite",
            styleUrl: "mapbox://styles/mapbox/satellite-streets-v11",
          },
        ],
        onChange: (style) => console.log(style),
      }),
      "bottom-left"
    );

    // Compass
    map.addControl(new CompassControl(), "top-right");

    // Zoom
    map.addControl(new ZoomControl(), "top-right");
  }
  render() {
    return <div className="mapWrapper" id="map" />;
  }
}
export default App;
