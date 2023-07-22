import { Box, Button, Divider, IconButton, Paper, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import AppContext from "../Configs/Context"
import { Brightness1Rounded, Brightness2Rounded, Brightness5Rounded, Brightness7Rounded, DarkModeRounded, LightModeRounded } from '@mui/icons-material'

function Auth() {
    const appCtx: any = useContext(AppContext)
    const [inputText, setInputText] = useState('')

    return (
        <>
            <Box sx={{ position: 'fixed', width: '100%', display: 'flex', justifyContent: 'flex-end' }}>

                <IconButton sx={{ mr: 1, mt: 1 }} onClick={() => {
                    appCtx.setIsNight(!appCtx.isNight); console.log('done', appCtx);
                }}>
                    {appCtx.isNight ? <Brightness7Rounded /> : <Brightness5Rounded />}
                </IconButton>
            </Box>

            <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Paper sx={{ width: '300px', height: 'fit-content', p: 4, borderRadius: '30px', backgroundColor: ' colors.theme ' }}>
                    <center>
                        <br />
                        <img style={{ width: '40%', height: 'auto', borderRadius: '100%' }} src={require("../../Assets/Logo.png")} alt="logo" />
                        <Typography variant='h6'>Login to Notify</Typography>
                        <br />
                        <TextField label='Email' InputProps={{ sx: { borderRadius: '20px' } }} type='email' fullWidth value={inputText} onChange={(t) => setInputText(t.target.value)} />
                        <br />
                        <Button sx={{ p: 1, borderRadius: '10px', mt: 1 }} fullWidth variant='contained'>Next</Button>
                    </center>
                </Paper>
            </Box>
        </>
    )
}

export default Auth