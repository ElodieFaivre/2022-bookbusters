import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { favoritesBooks, libraryBooks, myAlertsBooks } from "../../api/fetchApi";
import BookDetailModal from "../BookDetailModal/BookDetailModal";
import BookDisplayModel from "../BookDisplayModel/BookDisplayModel";
import Spinner from "../Spinner/Spinner";

const BookDisplay = () => {
  const [data, setData] = useState([]);
  const [library, setLibrary] = useState([]);
  const [alert, setAlert] = useState([]);

  useEffect(() => {
    libraryBooks(setLibrary);
    favoritesBooks(setData);
    myAlertsBooks(setAlert);
  }, []);

  const location = useLocation();
  //console.log(location.pathname === "/Favorites");
  //console.log(data);

  function locationMap() {
    /*if (location.pathname === "/Favorites") {
      return data;
    } else if (location.pathname === "/Library") {
      return library;
    } else if (location.pathname === "/MyAlerts") {
      return alert;
    }*/
    switch (location.pathname) {
      case "/Favorites":
        return data;
      case "/Library":
        return library;
      case "/MyAlerts":
        return alert;
      default:
        return null;
    }
  }

  function attenteReceptionDonnees() {
    if (locationMap().length < 1) {
      return false;
    } else {
      return true;
    }
  }
  console.log(locationMap());
  return (
    <div>
      {" "}
      <Box
        className="containerMapLivre"
        component="div"
        sx={{ justifyContent: "center", display: { md: "flex", xs: "grid" } }}
      >
        {attenteReceptionDonnees() ? (
          locationMap().books.map((data, index) => <BookDisplayModel key={index} data={data} />)
        ) : (
          <Spinner />
        )}
      </Box>
      <BookDetailModal />
    </div>
  );
};

export default BookDisplay;
