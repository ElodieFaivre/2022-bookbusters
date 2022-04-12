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

export const registerUser = (
  postalCode,
  communeCode,
  username,
  email,
  password,
  handleRegisterSuccess,
  setErrorAlert
) => {
  axios
    .post("/v1/user", {
      username,
      email,
      password,
      // bio: "gnagnagna",
      location: "(48.8833024, 2.3789568)",
      postalCode,
      communeCode,
      mail_donation: true,
      mail_alert: true,
      // avatar_id: "1",
    })
    .then(() => {
      handleRegisterSuccess();
    })
    .catch((error) => {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorAlert(error.response.data.message);
      } else {
        setErrorAlert("Une erreur est survenue lors de l'inscription.");
        console.error(error);
      }
    });
};

// N2cessité de renvoyer le token du user connecté si connecté
export const searchBooks = () => {
  axios
    .get("/v1/book/search?q=bel%20ami&limit=40&start=0")
    .then((res) => console.log(res))
    .catch((error) => {
      console.log(error);
    });
};

searchBooks();

export const fetchApi = {
  connectUser,
  registerUser,
};

export default fetchApi;
