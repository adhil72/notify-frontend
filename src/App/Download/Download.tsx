import { AndroidOutlined, DriveEtaRounded, Google } from '@mui/icons-material'
import { Box, Button, Paper, Typography } from '@mui/material'
function Download() {
    return (
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper sx={{ width: 'fit-content', p: 5, borderRadius: '30px' }} >
                <center>
                    <AndroidOutlined sx={{ fontSize: '150px', color: 'green' }} />
                    <Typography variant='h4' sx={{mt:-3}}>Download android app</Typography>
                    <img style={{width:'400px'}} src={require('../../Assets/download.png')} alt="" />
                    <br />
                    <Button sx={{mt:3}} variant='outlined' href='https://drive.google.com/file/d/1AmemWJA5TksWz8Onk56IO3issq8De04b/view?usp=sharing'>
                        <Google sx={{mr:1}}/>Google drive
                    </Button>
                </center>
            </Paper>
        </Box>
    )
}

export default Download