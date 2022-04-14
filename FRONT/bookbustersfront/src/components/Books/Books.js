import { Box } from "@mui/system";

import React, { useEffect, useState } from "react";

import Book from "../Book/Book";
import { latestAddition } from "../../api/fetchApi";
import BookDetailModal from "../BookDetailModal/BookDetailModal";

// C'est ici que nous allons faire notre map pour afficher plusieurs livres.

function Books() {
  const [data, setData] = useState([]);

  useEffect(() => {
    latestAddition(setData);
  }, [setData]);

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
        {data.map((livre, index) => (
          <Book key={`je-suis-unique-${index}`} livre={livre} users={livre.donors} />
        ))}
        <BookDetailModal />
      </Box>
    </>
  );
}

export default Books;
