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

  const [isLoadingFavorit, setisLoadingFavorit] = useState(true);
  const [isLoadingLibrary, setIsLoadingLibrary] = useState(true);
  const [isLoadingAlert, setIsLoadingAlert] = useState(true);

  useEffect(() => {
    libraryBooks(setLibrary, setIsLoadingLibrary);
    favoritesBooks(setData, setisLoadingFavorit);
    myAlertsBooks(setAlert, setIsLoadingAlert);
  }, []);

  const location = useLocation();
  //console.log(location.pathname === "/Favorites");
  //console.log(data);

  function isLoading() {
    return isLoadingFavorit || isLoadingLibrary || isLoadingAlert;
  }

  function locationMap() {
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
  console.log(isLoading());
  return (
    <div>
      {" "}
      <Box
        className="containerMapLivre"
        component="div"
        sx={{ justifyContent: "center", display: { md: "flex", xs: "grid" } }}
      >
        {!isLoading() ? (
          <>
            {attenteReceptionDonnees() &&
              locationMap().books.map((data, index) => <BookDisplayModel key={index} data={data} />)}
            {!attenteReceptionDonnees() && "aucune donnée"}
          </>
        ) : (
          <Spinner />
        )}
      </Box>
      <BookDetailModal />
    </div>
  );
};

export default BookDisplay;
