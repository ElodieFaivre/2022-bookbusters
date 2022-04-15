import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import bookContext from "../../contexts/BookContext.js";
import PLS from "../../assets/img/simpson.jpg";

export default function BookDisplayModel({ data }) {
  function livrePLS() {
    // permet de charger une cover de livre si la base de donnée n'en renvoi pas
    if (data.cover === undefined) {
      return PLS;
    } else {
      return data.cover;
    }
  }
  const { setOpenedBook } = React.useContext(bookContext);
  return (
    <Button onClick={() => setOpenedBook(data)}>
      <Card
        sx={{
          maxWidth: "200px",
          m: 2,
          height: "500px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardMedia component="img" image={livrePLS()} alt="seigneur" />
        <CardContent
          sx={{
            overflowY: "auto",
            marginBottom: " 1px",
          }}
        >
          <Typography gutterBottom sx={{ fontSize: "1.2em" }} component="div">
            {data.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <b>Auteur: </b> {data.author}
          </Typography>
        </CardContent>
      </Card>
    </Button>
  );
}
