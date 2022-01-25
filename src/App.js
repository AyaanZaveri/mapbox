import React, { useState, useEffect } from "react";
import "./App.css";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import MapboxDraw from "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { IconTrafficLights, IconSun, IconMoon, IconWorld } from "@tabler/icons";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

/* eslint-disable import/no-webpack-loader-syntax */
// @ts-ignore
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const App = () => {
  const [style, setStyle] = useState("mapbox://styles/mapbox/streets-v11");
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: style,
      center: [-73.985664, 40.748514],
      zoom: 12,
    });

    const Directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
      profile: "mapbox/driving",
    });

    const Draw = new MapboxDraw();

    const Navigation = new mapboxgl.NavigationControl();

    const Geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true,
    });

    // Directions
    map.addControl(Directions, "top-left");

    // Geolocate
    map.addControl(Geolocate);

    // Draw
    map.addControl(Draw, "top-right");

    // Navigation
    map.addControl(Navigation);

    return () => {
      map.remove();
      console.log("unmounted");
    };
  }, [style]);

  return (
    <div>
      <div className="mapWrapper" id="map"></div>
      <div
        id="menu"
        class="mapboxgl-ctrl-top-right mapboxgl-ctrl mapboxgl-ctrl-group m-[10px] relative mt-[20.7rem]"
      >
        <button
          className="mapboxgl-ctrl-zoom-in"
          type="button"
          aria-label="Zoom in"
          aria-disabled="false"
          onClick={() => setStyle("mapbox://styles/mapbox/streets-v11")}
        >
          <IconTrafficLights className="inline-flex justify-center w-8/12" />
        </button>

        <button
          className="mapboxgl-ctrl-zoom-in"
          type="button"
          aria-label="Zoom in"
          aria-disabled="false"
          onClick={() => setStyle("mapbox://styles/mapbox/light-v10")}
        >
          <IconSun className="inline-flex justify-center w-8/12" />
        </button>

        <button
          className="mapboxgl-ctrl-zoom-out"
          type="button"
          aria-label="Zoom out"
          aria-disabled="false"
          onClick={() => setStyle("mapbox://styles/mapbox/dark-v10")}
        >
          <IconMoon className="inline-flex justify-center w-8/12" />
        </button>

        <button
          className="mapboxgl-ctrl-zoom-out"
          type="button"
          aria-label="Zoom out"
          aria-disabled="false"
          onClick={() => setStyle("mapbox://styles/mapbox/satellite-streets-v11")}
        >
          <IconWorld className="inline-flex justify-center w-8/12" />
        </button>
      </div>
    </div>
  );
};

export default App;
