// Imports REACT
import React, { useState, useContext } from "react";
// Imports MUI
import {
  Avatar,
  Button,
  Grid,
  Box,
  CssBaseline,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";

import userContext from "../../contexts/UserContext";
import alertContext from "../../contexts/AlertContext";
import bookContext from "../../contexts/BookContext";

// Import Composants
import Header from "../Header/Header";
import Copyright from "../Copyright/Copyright";

// Import React-Router-Dom
import { Link, useNavigate } from "react-router-dom";

function ContactFormDonation() {
  const { openedBook, setOpenedBook } = useContext(bookContext);
  const { userInfo } = useContext(userContext);

  const [message, setMessage] = useState(
    `Bonjour, votre livre ${openedBook.title} est-il toujours au don ?`
  );
  const [username, setUsername] = useState("");

  const { setErrorAlert, setSuccessAlert } = useContext(alertContext);
  console.log(openedBook);
  const navigate = useNavigate();

  console.log(userInfo);

  const handleSubmit = (event) => {
    event.preventDefault();
    let errors = [];

    // vérification du message de l'utilisateur
    if (message.length == 0) {
      errors.push("Veuillez écrire un message au donateur");
    }
    if (errors.length > 0) {
      return setErrorAlert(errors.join(", "));
    }

    (userInfo.email = user_email),
      (userInfo.username = setUsername),
      (openedBook.donors.email = donor_email),
      (openedBook.title = book_title),
      message;
    console.log(user_email, user_fullname, donor_email, book_title);
    // A envoyer au back : title of book, donor (email), user email, username, message
    // contactDonor(
    // );
    const handleFormDonationSuccess = () => {};
    setSuccessAlert("Votre demande auprès du donateur a été envoyée");
  };
  return (
    <div>
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
            <ImportContactsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Contactez le donateur
          </Typography>
          <Typography
            variant="body2"
            sx={{
              padding: 2,
            }}
          >
            Vous contactez <strong>{openedBook.donors[0].username}</strong> pour
            le livre <strong>{openedBook.title}</strong>
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
                  fullWidth
                  id="pseudo"
                  label="Votre pseudo"
                  autoFocus
                  defaultValue={userInfo.username}
                  disabled
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Votre adresse email"
                  name="email"
                  defaultValue={userInfo.email}
                  autoComplete="email"
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoFocus="true"
                  multiline
                  rows={5}
                  defaultValue="Bonjour, votre livre est-il toujours au don ? "
                  required
                  fullWidth
                  id="message"
                  label="Votre message au donateur"
                  name="message"
                  value={message}
                  onChange={({ target }) => setMessage(target.value)}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Envoyer la demande
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </div>
  );
}

export default ContactFormDonation;
