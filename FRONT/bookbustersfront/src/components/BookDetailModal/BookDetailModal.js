import React, { useContext } from "react";
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
  if (!openedBook) return null;

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
          <Box>
            <Tooltip
              title="Ajoutez ce livre à vos favoris"
              arrow
              placement="right"
            >
              <IconButton>
                <FavoriteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip
              title="Ajoutez ce livre à votre bilbiothèque"
              arrow
              placement="right"
            >
              <IconButton>
                <BookIcon />
              </IconButton>
            </Tooltip>
            <Tooltip
              title="Activez la donation pour ce livre"
              arrow
              placement="right"
            >
              <IconButton>
                <VolunteerActivismIcon />
              </IconButton>
            </Tooltip>
            <Tooltip
              title="Ajoutez une alerte pour ce livre"
              arrow
              placement="right"
            >
              <IconButton>
                <AddAlertIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Box id="modal-modal-description" sx={{ margin: "0px 5px 0px 5px" }}>
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
