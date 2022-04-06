import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import seigneur from "../../assets/img/seigneur.jpg";

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

export default function Book() {
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
          <CardMedia
            component="img"
            //height="140"
            //width="550px"
            image={seigneur}
            alt="seigneur"
          />
          <CardContent>
            <Typography gutterBottom /*variant="h5" */ sx={{ fontSize: "1.5em" }} component="div">
              Le Seigneur des anneaux
            </Typography>
            <Typography variant="body2" color="text.secondary">
              c'est l'histoire d'un nain qui part en randonnée
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
