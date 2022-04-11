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
        setErrMsg(
          (error.response.data.message = "Login ou mot de passe incorrect")
        );
      } else {
        setErrMsg("Une erreur s'est produite");
      }
    });
};

// export const registerUser = ()

export const fetchApi = {
  connectUser,
};

export default fetchApi;
