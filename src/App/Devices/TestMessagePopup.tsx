import { Box, Button, Dialog, LinearProgress, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { testDeviceController } from '../../Api/Device';
import AppCtx from "../Configs/Context"

function TestMessagePopup(props: { open: boolean, onClose: () => void }) {

    const [progressing, setProgressing] = useState(false)
    const handleFormSubmit = (e: any) => {
        setProgressing(true)
        e.preventDefault()
        testDeviceController({ to: e.target[0].value, message: e.target[2].value }).then((res) => { props.onClose();setTimeout(()=>setProgressing(false),1000) }).catch((err) => {console.log(err);setProgressing(false)})
    }
    const ctx = useContext(AppCtx)

    return (
        <Dialog open={props.open} onClose={props.onClose} PaperProps={{ sx: { background: (ctx as any).isNight ? 'black' : 'white' } }}>
            <Typography variant='h5' sx={{ ml: 3, mt: 1 }}>Test message</Typography>
            <Box sx={{ pl: 3, pr: 3, pb: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '500px' }}>
                {!progressing&& 
                    <form onSubmit={handleFormSubmit} style={{ width: '100%' }}>
                        <TextField type='number' label='To' fullWidth />
                        <TextField type='text' multiline sx={{ mt: 1 }} label='Message' fullWidth />
                        <Button type='submit' fullWidth sx={{ mt: 1, p: 1 }} variant='contained'>Test device</Button>
                    </form>}
                {progressing&&<LinearProgress sx={{width:'100%'}}/>}
            </Box>
        </Dialog>
    )
}

export default TestMessagePopup