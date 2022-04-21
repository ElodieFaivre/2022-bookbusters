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
    <Button
      sx={{ alignItems: "flex-start" }}
      onClick={() => setOpenedBook(data)}
    >
      <Card
        sx={{
          maxWidth: "200px",
          minWidth: { xs: "160px", md: "200px" },
          margin: { xs: "8px 4px", md: "16px" },
          display: "flex",
          flexDirection: "column",
          alignSelf: "stretch",
          justifyContent: "space-between",
        }}
      >
        <CardMedia
          component="img"
          image={livrePLS()}
          alt={`Couverture du livre ${data.title}`}
        />
        <CardContent
          sx={{
            flexGrow: "1",
            gap: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Typography gutterBottom sx={{ fontSize: "1.2em" }} component="div">
            {data.title}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: "0.9em" }}
          >
            {data.author}
          </Typography>
        </CardContent>
      </Card>
    </Button>
  );
}
