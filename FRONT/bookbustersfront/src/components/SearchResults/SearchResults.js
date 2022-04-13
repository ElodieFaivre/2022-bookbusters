import { Container, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";

function SearchResults() {
  // const [data, setData] = useState([]);
  const location = useLocation();
  // console.log(location.state);
  const searchResultsAPI = location.state;

  return (
    <>
      <Header />
      <Box
        sx={{ display: "flex", justifyContent: "center", paddingTop: "3vh" }}
      >
        <Box
          sx={{
            width: "90%",
            display: "flex",
            flexFlow: "column wrap",
            textAlign: "left",

            // border: "2px solid black",
          }}
        >
          {searchResultsAPI.map((book) => (
            <Paper
              key={book.isbn13}
              elevation={15}
              sx={{
                // border: "1px solid black",
                marginBottom: "2vh",
                display: "flex",
                flexFlow: "row nowrap",
                justifyContent: "flex-start",
              }}
            >
              <Container
                item
                sx={{
                  // border: "1px solid black",
                  width: "min-content",
                  margin: "1vh 0vw 1vh 0vw",
                }}
              >
                <img src={book.cover}></img>
              </Container>
              <Container
                sx={{
                  padding: "0px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography item component="div" variant="overline">
                  Titre:
                </Typography>
                <Typography item component="div">
                  {book.title}
                  <br />
                </Typography>
                <br />

                <Typography item variant="overline">
                  Auteur:
                  <br />
                </Typography>
                <Typography item component="div">
                  {book.author}
                </Typography>
              </Container>
            </Paper>
          ))}
        </Box>
      </Box>
    </>
  );
}

export default SearchResults;

//*Résultats du console.log
// title, author, cover
