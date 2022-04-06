import * as React from "react";

import Header from "../components/Header/Header";
import SignButtons from "../components/SignButtons/SignButtons";
import Books from "../components/Books/Books";
import { Button, ButtonGroup, Container, Stack } from "@mui/material";

import "../styles/Home.scss";
import WelcomeBox from "../components/WelcomeBox/WelcomeBox";

const Home = () => {
  return (
    <>
      <Header />
      <WelcomeBox />
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
          <Button variant="contained" color="secondary">
            Autour de moi
          </Button>
        </ButtonGroup>
      </Container>
      <Books />
      <SignButtons />
    </>
  );
};

export default Home;
