import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import bookDefaultCover from "../../assets/img/simpson.jpg";
import bookContext from "../../contexts/BookContext";

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

          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            <p>
              <b>Auteur:</b> {book.author}{" "}
            </p>

            <Box
              component="p"
              sx={{
                display: { md: "inline" },
              }}
            >
              <b>Résumé: </b>{" "}
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
