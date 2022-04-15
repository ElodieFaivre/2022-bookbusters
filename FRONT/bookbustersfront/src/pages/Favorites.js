import { Box, Paper, Typography } from "@mui/material";
import ButtonsLibrary from "../components/ButtonsLibrary/ButtonsLibrary";
import Header from "../components/Header/Header";

const Favorites = () => {
  return (
    <>
      <Header />
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Paper elevation={3}>
          <Typography variant="h4" sx={{ paddingTop: "25px" }}>
            Bienvenue dans vos favoris
          </Typography>
          <Typography variant="body1" sx={{ padding: "15px" }}>
            Ici vous avez vos livres favoris
          </Typography>
        </Paper>
      </Box>
      <ButtonsLibrary />
    </>
  );
};

export default Favorites;
