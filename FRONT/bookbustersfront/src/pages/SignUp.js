import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Header from "../components/Header/Header";
import Copyright from "../components/Copyright/Copyright";
import { Link } from "react-router-dom";
import codesPostaux from "codes-postaux";

export default function SignUp() {
  const [postalCode, setPostalCode] = useState("");
  const [communeCode, setCommuneCode] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  const [possibleVilles, setPossibleVilles] = useState([]);

  useEffect(() => {
    if (possibleVilles.length === 1) {
      setCommuneCode(possibleVilles[0].codeCommune);
    } else if (possibleVilles.length === 0) {
      setCommuneCode("");
    }
  }, [possibleVilles]);

  const handlePostalCodeChange = ({ currentTarget }) => {
    if (currentTarget.value.length === 5) {
      setPossibleVilles(codesPostaux.find(currentTarget.value));
    } else {
      setPossibleVilles([]);
    }
    setPostalCode(currentTarget.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Vérification du code postal
    if (postalCode.length !== 5) {
      return alert("Code postal incorrecte");
    }

    // Vérification de la commune
    if (communeCode.length < 1) {
      return alert("Ville introuvable");
    }
  };

  return (
    <>
      <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Inscription
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="pseudo"
                  required
                  fullWidth
                  id="pseudo"
                  label="Pseudo"
                  autoFocus
                  onChange={({ target }) => setPseudo(target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>Code postaux français</Typography>
                <TextField
                  required
                  fullWidth
                  type="tel"
                  id="codePostal"
                  label="Code Postal"
                  name="codePostal"
                  placeholder="75001"
                  autoComplete="email"
                  value={postalCode}
                  onChange={handlePostalCodeChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl required fullWidth>
                  <InputLabel id="cities-label">Ville/Commune</InputLabel>
                  <Select
                    id="cities"
                    labelId="cities-label"
                    value={communeCode}
                    label="Ville/Commune"
                    onChange={({ target }) => setCommuneCode(target.value)}
                    required
                  >
                    {possibleVilles.length < 1 && (
                      <MenuItem disabled>Aucune ville trouvée</MenuItem>
                    )}
                    {possibleVilles.map((ville) => (
                      <MenuItem
                        key={ville.codeCommune}
                        value={ville.codeCommune}
                      >
                        {ville.nomCommune}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Adresse email"
                  name="email"
                  autoComplete="email"
                  // error
                  // helperText="Mail au mauvais format"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Confirmation de mot de passe"
                  type="password"
                  id="passwordVerification"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              S'inscrire
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  to="/SignIn"
                  style={{ color: "#000", textDecoration: "underline" }}
                >
                  Déjà inscrit? Connectez-vous
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </>
  );
}
