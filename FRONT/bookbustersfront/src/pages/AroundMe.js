//import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React from "react";

import Buttons from "../components/Button/Button";
import Header from "../components/Header/Header";

import "../styles/AroundMe.scss";
import axios from "axios";

const AroundMe = () => {
  //const options = { location: "location: (48.5,2.3), radius : 200" };
  axios
    .post("http://localhost:5000/v1/book/around-me", {
      location: "(50.67987000000005,3.0685400000000413)",
      radius: "200",
    })
    .then((response) => console.log(response))
    .catch((error) => {
      console.log(error);
    });

  return (
    <div>
      <Header />
      <Buttons />
      <div id="map">
        <MapContainer
          center={[50.67987000000005, 3.0685400000000413]}
          zoom={13}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[50.67987000000005, 3.0685400000000413]}>
            <Popup>je suis une patate</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default AroundMe;
