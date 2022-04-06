import { Box } from "@mui/system";
import React, { useEffect } from "react";
import Book from "../Book/Book";

// C'est ici que nous allons faire notre map pour afficher plusieurs livres.

function Books() {
  useEffect(() => {}, []);

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
