import { Button, ButtonGroup, Stack } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Book from '../Book/Book'


// C'est ici que nous allons faire notre map pour afficher plusieurs livres.

function Books() {
  return (
      <>
      <Stack direction='row'>
        <ButtonGroup>
            <Button variant='contained' color='primary'>Les derniers</Button>
            <Button variant='contained' color='secondary'>Autour de moi</Button>
        </ButtonGroup>
      </Stack>
    <Box sx={{
        display:'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    }} >
        <Book />
        <Book />
        <Book />
        <Book />
    </Box>
    </>
  )
}

export default Books
