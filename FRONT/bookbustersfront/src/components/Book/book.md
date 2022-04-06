import \* as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import seigneur from '../../assets/img/seigneur.jpg'

export default function Book() {
return (
<Card sx={{
          maxWidth: 150,
          m: 2
    }}>
<CardActionArea>
<CardMedia
component="img"
//height="140"
//width="550px"
image= {seigneur}
alt="seigneur"
/>
<CardContent>
<Typography gutterBottom /_variant="h5" _/ sx={{fontSize: "1.5em"}} component="div">
Le Seigneur des anneaux
</Typography>
<Typography variant="body2" color="text.secondary">
c'est l'histoire d'un nain qui part en randonnée
</Typography>
</CardContent>
</CardActionArea>
</Card>
);
}
