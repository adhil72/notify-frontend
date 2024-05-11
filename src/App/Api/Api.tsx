import { Brightness5Rounded, Brightness7Rounded, CopyAll, LogoutOutlined, NotificationsActiveOutlined } from '@mui/icons-material';
import { Box, Button, Divider, Paper, TextField, Tooltip, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import theme from '../Configs/theme';
import Ctx from "../Configs/Context"
import CodeBlock from './Code';
import { generateTokenController } from '../../Api/Auth';
import instance from '../../Api/Config';

function Api() {
    const ctx: any = useContext(Ctx)
    const [token, setToken] = useState('Api key not generated')

    const generateToken = () => {
        generateTokenController().then((res) => {
            setToken(res.data.data.token)
        }).catch((err) => { })
    }

    const copyString = (str: string) => {
        navigator.clipboard.writeText(str)
        alert('Copied to clipboard')
    }

    const code =` const data = {
        message: "Hello from Notify",
        to: "XXXXXXXXXX"
    };
    
    const headers = {
        Authorization: "Bearer ${token == 'Api key not generated' ? 'YOUR_TOKEN' : token}"
    };
    
    Axios.post("${instance.defaults.baseURL}/devices/messages/send", data, { headers })
        .then(response => {
            // Handle the response data
            console.log(response.data);
        })
        .catch(error => {
            // Handle the error
            console.error(error);
        });`

    return (
        <Box sx={{ width: '100%', height: '100vh' }}>
            <Paper sx={{ width: '100%', height: '60px', display: 'flex', alignContent: 'center', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '20px', ml: 2 }}>Dashboard</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignContent: 'center', alignItems: 'center', pr: 3 }}>
                    <Tooltip title='Notifications'>
                        <Box sx={{ cursor: 'pointer', width: '40px', height: '40px', borderStyle: 'solid', borderWidth: '1px', borderColor: theme(true).primary, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <NotificationsActiveOutlined sx={{ color: theme(true).primary, fontSize: '20px' }} />
                        </Box>
                    </Tooltip>
                    <Tooltip title='Change theme'>
                        <Box onClick={() => ctx.setIsNight(!ctx.isNight)} sx={{ ml: 1, cursor: 'pointer', width: '40px', height: '40px', borderStyle: 'solid', borderWidth: '1px', borderColor: theme(true).primary, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {ctx.isNight ? <Brightness7Rounded sx={{ color: theme(true).primary, fontSize: '20px' }} /> : <Brightness5Rounded sx={{ color: theme(true).primary, fontSize: '20px' }} />}
                        </Box>
                    </Tooltip>
                    <Tooltip onClick={() => { localStorage.clear(); localStorage.setItem('dark', `${ctx.isNight}`); window.location.href = '/' }} title='Logout'>
                        <Box sx={{ ml: 1, cursor: 'pointer', width: '40px', height: '40px', borderStyle: 'solid', borderWidth: '1px', borderColor: theme(true).primary, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <LogoutOutlined sx={{ color: theme(true).primary, fontSize: '20px' }} />
                        </Box>
                    </Tooltip>
                </Box>
            </Paper>

            <Paper sx={{ m: 2, display: 'flex' }}>
                <Box sx={{ m: 2, width: '100%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: "100%" }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <TextField disabled={token == 'Api key not generated'} value={token} />
                            <Button onClick={generateToken} color='info' variant='text' sx={{ ml: 2 }}>Generate</Button>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography>Last generated: 2021-10-10</Typography>
                        </Box>
                    </Box>
                </Box>
            </Paper>

            <Paper sx={{ m: 2, display: 'flex' }}>
                <Box sx={{ m: 2, width: '100%' }}>
                    <Typography sx={{ fontWeight: 'bold' }}>Api documentation</Typography>
                    <Divider sx={{ mt: 1, mb: 1 }} />
                    {/* <Typography sx={{ fontWeight: 'bold' }}>Get SMS history</Typography>
                    <Box sx={{ display: 'flex' }}>
                        <Typography sx={{ mr: 1 }}>GET /devices/messages/get</Typography>
                    </Box>
                    <Typography sx={{ color: 'GrayText' }}>Sample code for js</Typography>
                    <Box sx={{ maxWidth: '80%', overflowX: 'auto' }}>

                        <CodeBlock code={`Axios.get("http://localhost:50000/devices/messages/get")
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });`} />
                    </Box> */}

                    <Divider sx={{ mt: 1, mb: 1 }} />
                    <Typography sx={{ fontWeight: 'bold' }}>Send SMS</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ mr: 1 }}>POST {instance.defaults.baseURL}/devices/messages/send</Typography>
                        <Button onClick={()=>{copyString(`${instance.defaults.baseURL}/devices/messages/send`)}}><CopyAll /></Button>
                    </Box>
                    <Typography sx={{ color: 'GrayText' }}>Sample code for js</Typography>
                    <Box onClick={()=>copyString(code)} sx={{ maxWidth: '80%', overflowX: 'auto',cursor:'pointer' }}>
                        <CodeBlock  language='javascript' code={code} />
                    </Box>
                </Box>

            </Paper>


        </Box>
    )
}

export default Api