import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';

import seigneur from '../../assets/img/seigneur.jpg'

export default function Book() {
  return (
    <Box sx={{display:"flex"}} >
      <Card sx={{ maxWidth: 150}}>
        <CardActionArea>
          <CardMedia
            component="img"
            //height="140"
            //width="550px"
            image= {seigneur}
            alt="seigneur"
          />
          <CardContent>
            <Typography gutterBottom /*variant="h5" */ sx={{fontSize: "1.5em"}} component="div">
              Le Seigneur des anneaux
            </Typography>
            <Typography variant="body2" color="text.secondary">
              c'est l'histoire d'un nain qui part en randonnée
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card sx={{ maxWidth: 150}}>
        <CardActionArea>
          <CardMedia
            component="img"
            //height="140"
            //width="550px"
            image= {seigneur}
            alt="seigneur"
          />
          <CardContent>
            <Typography gutterBottom /*variant="h5" */ sx={{fontSize: "1.5em"}} component="div">
              Le Seigneur des anneaux
            </Typography>
            <Typography variant="body2" color="text.secondary">
              c'est l'histoire d'un nain qui part en randonnée
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}
