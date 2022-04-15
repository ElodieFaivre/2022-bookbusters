import React, { useContext, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import bookContext from "../../contexts/BookContext";
import bookDefaultCover from "../../assets/img/simpson.jpg";

// Import des icones pour la modale
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookIcon from "@mui/icons-material/Book";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Tooltip } from "@mui/material";

const styleBox = {
  position: "absolute",
  top: { xs: "50%", md: "50%" },
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  bgcolor: "background.paper",
  boxShadow: 20,
  p: 2,
  maxHeight: "90vh",
  overflowY: "auto",
  borderRadius: "5px",
};

function BookDetailModal() {
  const { openedBook, setOpenedBook } = useContext(bookContext);
  const [library, setlibrary] = useState(true);
  const [favorit, setFavorit] = useState(true);
  const [alert, setalert] = useState(true);
  const [donation, setDonation] = useState(true);

  if (!openedBook) return null;

  const handleAlertButton = () => {
    setalert(!alert);
  };
  const handleLibraryButton = () => {
    setlibrary(!library);
  };
  const handleFavoritButton = () => {
    setFavorit(!favorit);
  };
  const handleDonationButton = () => {
    setDonation(!donation);
  };
  const handleCloseModal = () => {
    setOpenedBook(null);
  };
  const book = openedBook;
  const users = book.donors;

  return (
    <Modal
      open={Boolean(openedBook)}
      onClose={() => setOpenedBook(null)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        position: "fixed",
      }}
    >
      <Box sx={styleBox}>
        <Box sx={{ textAlign: "right" }}>
          <IconButton onClick={handleCloseModal}>
            <CloseIcon sx={{ color: "black" }} fontSize="small" />
          </IconButton>
        </Box>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ textAlign: "center", mb: 2 }}
        >
          {book.title}
        </Typography>

        <Box sx={{ display: { xs: "block", md: "flex" } }}>
          <Box
            sx={{
              maxWidth: { xs: "250px", md: "500px" },
              height: "auto",
              padding: { xs: "auto", md: "0px 20px 15px 0px" },
            }}
          >
            {book.cover ? (
              <img
                className="imageCovers"
                alt="Book cover"
                src={book.cover}
              ></img>
            ) : (
              <img
                className="imageCovers"
                alt="Generic book cover"
                src={bookDefaultCover}
              ></img>
            )}
          </Box>
          {/* Zone des icones d'interactions */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Tooltip
              title="Ajoutez ce livre à vos favoris"
              arrow
              placement="right"
            >
              <IconButton onClick={handleFavoritButton}>
                {favorit ? (
                  <FavoriteIcon sx={{ color: "gold" }} />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip
              title="Ajoutez ce livre à votre bilbiothèque"
              arrow
              placement="right"
            >
              <IconButton onClick={handleLibraryButton}>
                {library ? (
                  <BookOutlinedIcon />
                ) : (
                  <BookIcon sx={{ color: "brown" }} />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip
              title="Activez la donation pour ce livre"
              arrow
              placement="right"
            >
              <IconButton onClick={handleDonationButton}>
                {donation ? (
                  <VolunteerActivismIcon sx={{ color: "red" }} />
                ) : (
                  <VolunteerActivismOutlinedIcon />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip
              title="Ajoutez une alerte pour ce livre"
              arrow
              placement="right"
            >
              <IconButton onClick={handleAlertButton}>
                {alert ? (
                  <AddAlertIcon sx={{ color: "green" }} />
                ) : (
                  <AddAlertOutlinedIcon />
                )}
              </IconButton>
            </Tooltip>
          </Box>

          <Box
            id="modal-modal-description"
            sx={{ margin: "0px 15px 0px 15px" }}
          >
            <Typography variant="overline">Auteur:</Typography>
            <Typography>{book.author}</Typography>
            <Box
              component="p"
              sx={{
                display: { md: "inline" },
              }}
            >
              <Typography variant="overline"> Résumé:</Typography>
              {book.resume ? (
                <Typography>{book.resume}</Typography>
              ) : (
                <Typography>Pas de résumé trouvé pour ce livre.</Typography>
              )}
            </Box>
          </Box>
        </Box>
        <Box>
          {users && users.length > 0 && (
            <>
              Livre disponible chez :{" "}
              {users.map((user, index) => (
                <span className="bookUserOwner" key={index}>
                  {user.username}
                </span>
              ))}
            </>
          )}
          {(!users || users.length === 0) && (
            <>
              <Typography>Personne ne possède le livre !</Typography>
            </>
          )}
        </Box>
      </Box>
    </Modal>
  );
}

export default BookDetailModal;
