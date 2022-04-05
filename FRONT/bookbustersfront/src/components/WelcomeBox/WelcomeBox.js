import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import BookStack from '../../assets/img/books.jpg'


function WelcomeBox() {
  return (
    <Box sx={{
        backgroundImage: `url(${BookStack})`,
        textAlign: 'center',
    }}>
    <Paper elevation={3}>
        <Typography variant='h4' >
            Bienvenue sur BookBusters !
        </Typography>
        <Typography variant='body1'>
            Ici vous allez pouvoir chercher et donner des livres
            en toute simplicité !
        </Typography>

    </Paper>
    </Box>
  )
}

export default WelcomeBox
