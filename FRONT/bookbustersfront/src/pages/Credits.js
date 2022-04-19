import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Header from "../components/Header/Header";

const Credits = () => {
  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "15vh",
        }}
      >
        <Paper
          sx={{
            width: "90%",
            height: "auto",
            padding: "15px",
            textAlign: "center",
          }}
          elevation="15"
        >
          <Typography variant="h6">
            Nous sommes toujours à la recherche de l'équipe de BookBusters !
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

export default Credits;
