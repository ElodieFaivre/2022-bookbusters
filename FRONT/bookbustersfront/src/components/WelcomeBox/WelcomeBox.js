import { Box, Paper, Typography } from '@mui/material'
import React from 'react'

function WelcomeBox() {
  return (
    <Box sx={{
        textAlign: 'center',
    }}>
    <Paper elevation={3} >
        <Typography variant='h4' sx={{paddingTop: '25px'}}>
            Bienvenue sur BookBusters !
        </Typography>
        <Typography variant='body1' sx={{padding: '15px'}}>
            Ici vous allez pouvoir chercher et donner des livres
            en toute simplicité !
        </Typography>

    </Paper>
    </Box>
  )
}

export default WelcomeBox
