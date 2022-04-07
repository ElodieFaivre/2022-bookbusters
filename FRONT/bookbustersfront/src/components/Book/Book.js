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
  width: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Book({ livre, user }) {
  function livrePLS() {
    // permet de charger une cover de livre si la base de donnée n'en renvoi pas
    if (livre.coverM === undefined) {
      return PLS;
    } else {
      return livre.coverM;
    }
  }

  function textPLS() {
    // permet de charger un resumer de livre si celui-ci n'en dispose pas
    if (livre.resume === undefined) {
      return (
        <p>
          Ah non, s'il vous plaît, laissez tomber les combines à deux ronds. Vous avez dit que ça devait être vexant!
          Ben voilà! Vous êtes vexé! Déjà à la corne, ils regardent même pas vers ici! Vous pouvez bien agiter tout les
          drapeaux que vous voudrez! Oui mais nous on est trois, enfin, deux et demi. Là c’est une table ronde. Pour que
          les chevaliers de Bretagne se réunissent autour. Toute façon autant vous y faire parce qu’à partir de
          maintenant on va s’appeler «Les Chevaliers de la Table Ronde».
        </p>
      );
    } else {
      return livre.resume;
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
          <CardContent>
            <Typography gutterBottom /*variant="h5" */ sx={{ fontSize: "1.2em" }} component="div">
              {livre.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
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
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: "center", mb: 2 }}>
            {livre.title}
          </Typography>
          <Box sx={{ display: "flex" }}>
            <CardMedia component="img" image={livrePLS()} alt="seigneur" sx={{ mr: 2 }} />

            <Box id="modal-modal-description" sx={{ mt: 2 }}>
              <p>
                <b>Auteur:</b> {livre.author}{" "}
              </p>
              <p>
                <b>synopsis :</b> {textPLS()}
              </p>
            </Box>
          </Box>
          <Box>Livre disponible chez : {user.username}</Box>
        </Box>
      </Modal>
    </>
  );
}
