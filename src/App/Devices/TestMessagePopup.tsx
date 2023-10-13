import { Box, Button, Dialog, TextField, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { testDeviceController } from '../../Api/Device';
import AppCtx from "../Configs/Context"

function TestMessagePopup(props: { open: boolean, onClose: () => void }) {

    const handleFormSubmit = (e: any) => {
        e.preventDefault()
        testDeviceController({ to: e.target[0].value, message: e.target[2].value }).then((res) => {
            alert(res.status)
            console.log(res);

        }).catch((err) => {
            console.log(err);
        })
    }
    const ctx = useContext(AppCtx)

    return (
        <Dialog open={props.open} onClose={props.onClose} PaperProps={{sx:{background:(ctx as any).isNight?'black':'white'}}}>
            <Typography variant='h5' sx={{ ml: 3, mt: 1 }}>Test message</Typography>
            <Box sx={{ pl: 3, pr: 3, pb: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '500px' }}>
                <form onSubmit={handleFormSubmit} style={{ width: '100%' }}>
                    <TextField type='number' label='To' fullWidth />
                    <TextField type='text' multiline sx={{ mt: 1 }} label='Message' fullWidth />
                    <Button type='submit' fullWidth sx={{ mt: 1, p: 1 }} variant='contained'>Test device</Button>
                </form>
            </Box>
        </Dialog>
    )
}

export default TestMessagePopup