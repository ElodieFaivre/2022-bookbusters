import { Container, ButtonGroup, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

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
          <Link to="/Library" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              Bibliothèque
            </Button>
          </Link>
          <Link to="/Favorites" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="secondary">
              Mes Favoris
            </Button>
          </Link>
          <Link to="/MyAlerts" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              Mes Alertes
            </Button>
          </Link>
        </ButtonGroup>
      </Container>
    </div>
  );
};

export default ButtonsLibrary;
