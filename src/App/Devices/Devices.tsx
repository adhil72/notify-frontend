import { AddRounded, Brightness5Rounded, Brightness7Rounded, LogoutOutlined, NotificationsActiveOutlined, PhoneIphoneRounded } from '@mui/icons-material';
import { Box, Collapse, Grid, Paper, Tooltip, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import theme from '../Configs/theme';
import AppCtx from "../Configs/Context"
import AddDevicePopup from './AddDevicePopup';
import { getAllDevices } from '../../Api/Device';
import TestMessagePopup from './TestMessagePopup';

function Devices() {

    const ctx: any = useContext(AppCtx)
    const [showAddDevicePopup, setShowAddDevicePopup] = useState(false)
    const [openTestMessagePopup, setOpenTestMessagePopup] = useState(false)
    const [devices, setDevices] = useState([])
    const [active, setActive] = useState(false)

    useEffect(() => { getAllDevices().then((res) => { setDevices(res.data.data) }).catch((err) => { console.log(err) }) }, [])
    useEffect(() => { setActive(false); setTimeout(() => { setActive(true) }, 1); }, [])

    return (
        <>
            <AddDevicePopup open={showAddDevicePopup} onClose={() => setShowAddDevicePopup(false)} />
            <TestMessagePopup open={openTestMessagePopup} onClose={() => setOpenTestMessagePopup(false)} />
            <Box sx={{ width: '100%', height: '100vh' }}>
                <Paper sx={{ width: '100%', height: '60px', display: 'flex', alignContent: 'center', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '20px', ml: 2 }}>Devices</Typography>
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
                <Collapse in={active}>

                    <Box sx={{ m: 2 }}>
                        <Paper sx={{ p: 2, borderRadius: '10px' }}>
                            <Grid container >
                                {devices.map((d: any) => {
                                    return <Grid item md={3} onClick={() => setOpenTestMessagePopup(true)}>
                                        <Box className='border-hover' sx={{ cursor: 'pointer', width: '97%', marginBottom: '7px', height: '70px', borderStyle: 'solid', borderColor: theme(ctx.isNight).grey, borderWidth: '1px', borderRadius: '10px', display: 'flex', alignContent: 'center', alignItems: 'center' }}>
                                            <Box sx={{ color: 'white', ml: 2, mr: 2, width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '100%', backgroundColor: theme(true).primary }}>
                                                <PhoneIphoneRounded />
                                            </Box>
                                            <Box>
                                                <Typography>{d.name}</Typography>
                                                <Typography sx={{ color: 'GrayText', fontSize: '13px' }}>{new Date(d.createdAt).toLocaleDateString()}</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                })}
                                <Grid item md={3}>
                                    <Box onClick={() => setShowAddDevicePopup(true)} className='border-hover' sx={{ cursor: 'pointer', width: '97%', height: '70px', borderStyle: 'solid', borderColor: theme(ctx.isNight).grey, borderWidth: '1px', borderRadius: '10px', display: 'flex', alignContent: 'center', alignItems: 'center' }}>
                                        <Box sx={{ color: 'white', ml: 2, mr: 2, width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '100%', backgroundColor: theme(true).primary }}>
                                            <AddRounded />
                                        </Box>
                                        <Box>
                                            <Typography>Add</Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                </Collapse>

            </Box>
        </>
    )
}

export default Devices