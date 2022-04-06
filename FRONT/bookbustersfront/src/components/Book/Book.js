import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
//import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import PLS from "../../assets/img/simpson.jpg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Book({ livre }) {
  function livrePLS() {
    if (livre.coverM === undefined) {
      return PLS;
    } else {
      return livre.coverM;
    }
  }

  console.log(livre);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button onClick={handleOpen}>
        <Card
          sx={{
            maxWidth: 150,
            m: 2,
          }}
        >
          <CardMedia component="img" image={livrePLS()} alt="seigneur" />
          {console.log(livre.coverM)}
          <CardContent>
            <Typography gutterBottom /*variant="h5" */ sx={{ fontSize: "1.2em" }} component="div">
              {livre.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Auteur: {livre.author}
            </Typography>
          </CardContent>
        </Card>
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
