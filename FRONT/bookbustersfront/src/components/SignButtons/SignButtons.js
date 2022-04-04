import { Stack, Button, ButtonGroup } from '@mui/material'

import React from 'react'

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
