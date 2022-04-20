import { Container, ButtonGroup, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import LinkButton from "../LinkButton/LinkButton";

const ButtonsLibrary = () => {
  return (
    <div>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ButtonGroup>
          <LinkButton to="/Library" text={"Bibliothèque"} />
          <LinkButton to="/Favorites" text={"Mes Favoris"} />
          <LinkButton to="/MyAlerts" text={"Mes Alertes"} />
        </ButtonGroup>
      </Container>
    </div>
  );
};

export default ButtonsLibrary;
