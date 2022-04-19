import { Box } from "@mui/system";
import { Button, ButtonGroup, Container } from "@mui/material";

import React, { useEffect, useState } from "react";

import Book from "../Book/Book";
import { latestAddition } from "../../api/fetchApi";
import BookDetailModal from "../BookDetailModal/BookDetailModal";

// C'est ici que nous allons faire notre map pour afficher plusieurs livres.

function Books() {
  const [data, setData] = useState([]);

  useEffect(() => {
    latestAddition(setData);
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: { md: "70%" },
          margin: "auto",
        }}
      >
        {data.map((book, index) => (

          <Book
            key={`je-suis-unique-${index}`}
            book={book}
            users={book.donors}
          />
        ))}
        <BookDetailModal />
      </Box>
    </>
  );
}

export default Books;
