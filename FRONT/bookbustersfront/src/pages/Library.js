import { Box, Paper, Typography } from "@mui/material";
import ButtonsLibrary from "../components/ButtonsLibrary/ButtonsLibrary";
import Header from "../components/Header/Header";

const Library = () => {
  return (
    <div>
      <Header />
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Paper elevation={3}>
          <Typography variant="h4" sx={{ paddingTop: "25px" }}>
            Bienvenue dans votre bibliothèque c'est comme une Discothèque juste ici on s'ennuie
          </Typography>
          <Typography variant="body1" sx={{ padding: "15px" }}>
            Ici vous allez pouvoir trier vos livres mettre au don ou supprimer un livre donner !
          </Typography>
        </Paper>
      </Box>
      <ButtonsLibrary />
    </div>
  );
};

export default Library;
