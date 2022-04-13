import {
  Container,
  CssBaseline,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import simpsonCoverDefault from "../../assets/img/simpson.jpg";
import "./style.scss";

function SearchResults() {
  // const [data, setData] = useState([]);
  const location = useLocation();
  // console.log(location.state);
  const searchResultsAPI = location.state;

  return (
    <>
      <Header />
      <CssBaseline />
      <Box
        sx={{ display: "flex", justifyContent: "center", paddingTop: "3vh" }}
      >
        <Box
          sx={{
            width: "90%",
            display: "flex",
            flexFlow: "column wrap",
            textAlign: "left",
            gap: "20px",
            // border: "2px solid black",
          }}
        >
          {searchResultsAPI.map((book) => (
            <Paper
              key={book.isbn13}
              elevation={15}
              sx={{
                // border: "1px solid black",
                display: "flex",
                height: "215px",
                padding: "15px",
              }}
            >
              <Box
                sx={{
                  // border: "1px solid black",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "left",
                  width: "210px",
                }}
              >
                {book.cover ? (
                  <img className="imageCovers" src={book.cover}></img>
                ) : (
                  <img className="imageCovers" src={simpsonCoverDefault}></img>
                )}
              </Box>
              <Box
                sx={{
                  // border: "1px solid black",
                  padding: "0px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                <Typography variant="overline">Titre:</Typography>
                <Typography>
                  {book.title}
                  <br />
                </Typography>
                <br />

                <Typography variant="overline">
                  Auteur:
                  <br />
                </Typography>
                {book.author.map((author, index) => (
                  <Typography key={`single-author${index}`}>
                    {author}
                  </Typography>
                ))}
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>
    </>
  );
}

export default SearchResults;
