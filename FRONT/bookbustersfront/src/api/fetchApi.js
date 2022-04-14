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

export const usersAroundMe = (setpositionUser, latitude, longitude) => {
  // permet de recuperer les user a coter de nous sur la map
  //console.log(latitude, longitude);
  axios
    .post("/v1/book/around-me", {
      location: `(${latitude},${longitude})`,
      radius: "20000",
    })
    .then((response) => setpositionUser(response.data))
    .catch((error) => {
      console.log(error);
    });
};

export const latestAddition = (setData) => {
  axios.get("/v1/book").then((res) => setData(res.data));
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

export async function searchBooks(search, limit = 10, start = 0) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    const responseSearchResult = await axios.get(
      `/v1/book/search?q=${search}&limit=${limit}&start=${start}`,
      config
    );
    console.log(responseSearchResult);
    return responseSearchResult;
  } catch (error) {
    console.log("error");
  }
}

export const fetchApi = {
  connectUser,
  registerUser,
  searchBooks,
  usersAroundMe,
};

export default fetchApi;

//localStorage.getItem('jwt')
