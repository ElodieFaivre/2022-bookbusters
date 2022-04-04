import { Stack, Button, ButtonGroup } from '@mui/material'

// import { createTheme, ThemeProvider } from '@mui/system'
import React from 'react'

// const themeSignButtons = createTheme({
//     text: {
//         primary: '#2e7d32',
//         secondary:'#ff8f00'
//     },
// });

function SignButtons() {
  return (

        <Stack direction='row'>
            <ButtonGroup
                fullWidth={true}
                sx={{
                    position: 'fixed',
                    top: 'calc(100% - 37px)'
                }}>
                <Button value='inscription' variant='contained'>
                    Inscription
                </Button>

                <Button value='connexion' variant='contained' color='secondary'>
                    Connexion
                </Button>
            </ButtonGroup>
        </Stack>

  )
}

export default SignButtons
