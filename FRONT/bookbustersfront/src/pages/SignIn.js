import React, { useEffect, useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Header from "../components/Header/Header";
import LibrarySign from "../assets/img/library.jpg";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

//* Import composant Link React-Router
import { Link } from "react-router-dom";
//* Import d'axios
import axios from "axios";

async function getUser() {
  try {
    const response = await axios.post("http://localhost:5000/v1/login", {
      login: "elodie.book@busters.fr",
      password: "test",
    });
    console.log(response);
  } catch (error) {
    console.log("error");
  }
}

// cet appel de fonction, doit être déclenchée quand user appuit sur se connecter
getUser();

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link to="/" style={{ color: "#000", textDecoration: "underline" }}>
        BookBusters
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignInSide() {
  // const useRef = useRef();
  // const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  {
    /* Mettre le focus sur le input form */
  }
  // useEffect(() => {
  //   useRef.current.focus();
  // }, []);

  {
    /* Deuxième useEffect pour vider les inputs que 
    nous pourrions avoir après une erreur */
  }
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <>
      <Header />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        {/* Création d'un message d'erreur
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p> */}
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${LibrarySign})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {success ? (
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <ThumbUpIcon />
              </Avatar>
              <Box component="section" sx={{ mt: 1 }}>
                <Grid container>
                  <Grid item xs>
                    <Link
                      to="/"
                      style={{ color: "#000", textDecoration: "underline" }}
                    >
                      Revenir à la page d'accueil
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        ) : (
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Connexion
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Adresse email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Se connecter
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link
                      to="/ForgotPassword"
                      style={{ color: "#000", textDecoration: "underline" }}
                    >
                      Mot de passe oublié?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      to="/SignUp"
                      style={{ color: "#000", textDecoration: "underline" }}
                    >
                      {"Pas encore inscrit ? Inscrivez-vous"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        )}
      </Grid>
    </>
  );
}
