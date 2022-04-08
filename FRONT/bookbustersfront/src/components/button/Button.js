import React from "react";
import { Button, ButtonGroup, Container } from "@mui/material";
import { Link } from "react-router-dom";

const Buttons = () => {
  return (
    <div>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ButtonGroup>
          <Button variant="contained" color="primary">
            Les derniers
          </Button>
          <Link to="/AroundMe" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="secondary">
              Autour de moi
            </Button>
          </Link>
        </ButtonGroup>
      </Container>
    </div>
  );
};

export default Buttons;
