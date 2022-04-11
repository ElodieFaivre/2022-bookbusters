import { useEffect, useState } from "react";
import axios from "./axios";

export const connectUser = (login, password, setErrMsg, handleLoginSuccess) => {
  axios
    .post("/v1/login", {
      login,
      password,
    })
    .then(({ data }) => {
      handleLoginSuccess(data.token);
    })
    .catch((error) => {
      {
        /*Ici je dois récupérer l'erreur que me renvoie la BDD */
      }
      if (error.response) {
        console.log(error.response.data.message);
        setErrMsg((error.response.data.message = "Login ou mot de passe incorrect"));
      } else {
        setErrMsg("Une erreur s'est produite");
      }
    });
};

export const usersAroundMe = (setpositionUser) => {
  // permet de recuperer les user a coter de nous sur la map
  axios
    .post("/v1/book/around-me", {
      location: "(50.67987000000005,3.0685400000000413)",
      radius: "200",
    })
    .then((response) => setpositionUser(response.data))
    .catch((error) => {
      console.log(error);
    });
};

export const fetchApi = {
  connectUser,
  usersAroundMe,
};

export default fetchApi;
