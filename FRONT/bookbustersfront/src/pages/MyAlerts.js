import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import BookDisplay from "../components/BookDisplay/BookDisplay";
import ButtonsLibrary from "../components/ButtonsLibrary/ButtonsLibrary";

import Header from "../components/Header/Header";

const MyAlerts = () => {
  return (
    <>
      <Header />
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Paper elevation={3}>
          <Typography variant="h4" sx={{ paddingTop: "25px" }}>
            Bienvenue dans vos alertes
          </Typography>
          <Typography variant="body1" sx={{ padding: "15px" }}>
            Ici vous avez vos livres mis sous alerte pour etres au courant des disponibilités
          </Typography>
        </Paper>
      </Box>
      <ButtonsLibrary />
      <BookDisplay />
    </>
  );
};

export default MyAlerts;
