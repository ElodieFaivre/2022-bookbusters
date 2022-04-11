//import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React, { useEffect, useState } from "react";

import Buttons from "../components/Button/Button";
import Header from "../components/Header/Header";

import "../styles/AroundMe.scss";
//import axios from "axios";
import { usersAroundMe } from "../api/fetchApi";

const AroundMe = () => {
  const [positionUser, setpositionUser] = useState([]);

  useEffect(() => {
    usersAroundMe(setpositionUser);
  }, []);

  const position = [50.67987000000005, 3.0685400000000413];

  return (
    <div>
      <Header />
      <Buttons />
      <div id="map">
        <MapContainer center={[50.67987000000005, 3.0685400000000413]} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/*<Marker position={[50.67987000000005, 3.0685400000000413]}>
            <Popup>je suis une patate</Popup>
          </Marker>*/}
          {positionUser.map((user, index) => (
            <Marker
              key={index}
              position={{
                lat: user.loc.replace("(", " ").split(",")[0],
                lng: user.loc.replace(")", " ").split(",")[1],
              }}
            >
              <Popup>je suis une patate</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default AroundMe;
