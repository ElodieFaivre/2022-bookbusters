//import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import React, { useEffect, useState, useCallback } from "react";
import CardMedia from "@mui/material/CardMedia";
import Buttons from "../components/Button/Button";
import Header from "../components/Header/Header";
import PLS from "../../src/assets/img/simpson.jpg";

import "../styles/AroundMe.scss";
//import axios from "axios";
import { usersAroundMe } from "../api/fetchApi";
import { Box } from "@mui/material";
import { textAlign } from "@mui/system";

const ChangeMapVue = ({ userCoords }) => {
  const map = useMap();
  map.setView([userCoords.latitude, userCoords.longitude], map.getZoom());
  return null;
};

const AroundMe = () => {
  const [positionUsers, setpositionUsers] = useState([]);
  const [userCoords, setuserCoords] = useState({ longitude: 0, latitude: 0 });

  useEffect(() => {
    usersAroundMe(setpositionUsers, userCoords.latitude, userCoords.longitude);
  }, [userCoords]);

  //console.log(userCoords.latitude, userCoords.longitude);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setuserCoords({ latitude, longitude });
      },
      (error) => console.error(error)
    );
  }, []);

  function livrePLS(banane) {
    // permet de charger une cover de livre si la base de donnée n'en renvoi pas
    if (banane.cover === undefined) {
      return PLS;
    } else {
      return banane.cover;
    }
  }

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
                lat: user.location.replace("(", " ").split(",")[0],
                lng: user.location.replace(")", " ").split(",")[1],
              }}
            >
              <Popup>
                {user.books.map((banane, index) => (console.log(banane), (<p key={index}>{banane.title}</p>)))}
              </Popup>
            </Marker>
          ))}
          <ChangeMapVue userCoords={userCoords} />
        </MapContainer>
      </div>
      {positionUsers.map((user) =>
        user.books.map((banane, index) => (
          <Box
            component="div"
            key={`unique-${index}`}
            className="bookMap"
            sx={{
              display: { xs: "block", md: "flex" },
              textAlign: { xs: "center", md: "start" },
              margin: { xs: "10px 0 25px 0", md: "1%" },
            }}
          >
            <CardMedia
              component="img"
              image={livrePLS(banane)}
              alt="cover de livre"
              className="img"
              sx={{
                width: { xs: "20vw", md: "10vw" },
                height: { xs: "30vw", md: "100%" },
                ml: { xs: "auto", md: "0" },
                mr: { xs: "auto", md: "0" },
              }}
            />

            <div>
              <h4>{banane.title}</h4>
              <b>Auteur :</b>
              {banane.author}
              <p>{banane.resume}</p>
            </div>
          </Box>
        ))
      )}
    </div>
  );
};

export default AroundMe;
