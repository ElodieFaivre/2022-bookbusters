import { Stack, Button, ButtonGroup, Link, Typography } from '@mui/material'

import React from 'react'

function SignButtons() {
  return (
    <Stack direction='row'>
        <Typography>
                <ButtonGroup
                    fullWidth={true}
                    sx={{
                        position: 'fixed',
                        top: 'calc(100% - 37px)'
                    }}
                    >
                    <Link href='/signInterface' color="inherit" underline="none">
                        <Button value='inscription' variant='contained'>
                                Inscription
                        </Button>
                    </Link>

                    <Link href='/signInterface' color="inherit" underline="none">
                        <Button value='connexion' variant='contained' color='secondary'>
                                Connexion
                        </Button>
                    </Link>

                </ButtonGroup>
        </Typography>
    </Stack>
  )
}

export default SignButtons
