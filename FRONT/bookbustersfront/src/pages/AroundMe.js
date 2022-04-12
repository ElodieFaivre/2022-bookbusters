//import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import React, { useEffect, useState } from "react";

import Buttons from "../components/Button/Button";
import Header from "../components/Header/Header";

import "../styles/AroundMe.scss";
//import axios from "axios";
import { usersAroundMe } from "../api/fetchApi";

const ChangeMapVue = ({ userCoords }) => {
  const map = useMap();
  map.setView([userCoords.latitude, userCoords.longitude], map.getZoom());
  return null;
};

const AroundMe = () => {
  const [positionUsers, setpositionUsers] = useState([]);
  const [userCoords, setuserCoords] = useState({ longitude: 0, latitude: 0 });

  useEffect(() => {
    usersAroundMe(setpositionUsers);
  }, []);

  useEffect(() => {
    navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;
      setuserCoords({ latitude, longitude });
    });
  }, []);

  return (
    <div>
      <Header />
      <Buttons />
      <div id="map">
        <MapContainer center={[userCoords.latitude, userCoords.longitude]} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {positionUsers.map((user, index) => (
            //console.log(user),
            <Marker
              key={index}
              position={{
                lat: user.loc.replace("(", " ").split(",")[0],
                lng: user.loc.replace(")", " ").split(",")[1],
              }}
            >
              <Popup>nombres de livre disponible a cette géolocalisation : {user.total}</Popup>
            </Marker>
          ))}
          <ChangeMapVue userCoords={userCoords} />
        </MapContainer>
      </div>
    </div>
  );
};

export default AroundMe;
