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
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              testaussi
            </Button>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="secondary">
              test
            </Button>
          </Link>
        </ButtonGroup>
      </Container>
    </div>
  );
};

export default ButtonsLibrary;
