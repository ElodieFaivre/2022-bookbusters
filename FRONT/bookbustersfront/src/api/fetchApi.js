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

export async function searchBooks(
  search,
  limit = 15,
  start = 0,
  setErrMsg,
  setData
) {
  try {
    const responseSearchResult = await axios.get(
      `/v1/book/search?q=${search}&limit=${limit}&start=${start}`
    );
    return responseSearchResult;
  } catch (error) {
    console.log("error");
  }
}
// q=${search}&limit=${limit}&start=${start}
export const fetchApi = {
  connectUser,
  registerUser,
  searchBooks,
};

export default fetchApi;
