import { Box } from "@mui/system";

import React, { useEffect, useState } from "react";
import axios from "axios";

import Book from "../Book/Book";

// C'est ici que nous allons faire notre map pour afficher plusieurs livres.

function Books() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/v1/book").then((res) => setData(res.data));
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
        {data.map((livre, index) => (
          <Book key={index} livre={livre} />
        ))}

        {/*data.map((livre) => data.user.map((user) => console.log(user)))*/}

        {/*   <Book />        <Book />        <Book />*/}
      </Box>
    </>
  );
}

export default Books;
