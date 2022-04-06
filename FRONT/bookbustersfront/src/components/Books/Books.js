import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Book from "../Book/Book";
import axios from "axios";

// C'est ici que nous allons faire notre map pour afficher plusieurs livres.

function Books() {
  //const [data, setData] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/v1/book").then((res) => console.log(res.data));
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        <Book />
        <Book />
        <Book />
        <Book />
      </Box>
    </>
  );
}

export default Books;
