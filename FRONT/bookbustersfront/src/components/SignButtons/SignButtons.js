import { Stack, Button, Link, Box } from '@mui/material'

import React from 'react'

function SignButtons() {
  return (
    <Stack direction='row'>
        <Box
            sx={{
                position: 'fixed',
                bottom: '0px',
                width: '100%'
            }}
            variant='contained'
        >
                <Link href='/signUp' color="inherit" underline="none">
                    <Button value='inscription' variant='contained' sx={{width: '50%', borderRadius: '5px 0px 0px 5px'}}>
                        Inscription
                    </Button>
                </Link>

                <Link href='/signIn' color="inherit" underline="none">
                    <Button value='connexion' variant='contained' color='secondary' sx={{width: '50%', borderRadius: '0px 5px 5px 0px'}}>
                        Connexion
                    </Button>
                </Link>

        </Box>
    </Stack>
  )
}

export default SignButtons
