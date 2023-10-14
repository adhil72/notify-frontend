import { Box, Collapse, Divider, Paper, Tooltip, Typography, Zoom } from '@mui/material'
import theme from '../Configs/theme'
import { Brightness5Rounded, Brightness7Rounded, LogoutOutlined, NotificationsActiveOutlined, WhatsApp } from '@mui/icons-material'
import Ctx from "../Configs/Context"
import { useContext, useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { shortenNumber } from '../Configs/NumberParser'
import { getMessagesController } from '../../Api/Device'
function Home() {

    const ctx: any = useContext(Ctx)
    const [active, setActive] = useState(false)
    const [messages, setMessages] = useState([])
    useEffect(() => { setActive(false); setTimeout(() => { setActive(true) }, 1); }, [])
    useEffect(()=>{getMessagesController().then((res)=>{setMessages(res.data.data)})},[])
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
            <Box sx={{ m: 2, display: 'flex' }}>
                <Paper sx={{ mt: 0.5, p: 2, width: '300px', borderRadius: '10px', display: 'flex', alignContent: 'center', alignItems: 'center' }}>
                    <Zoom in={active}><Typography variant='h5' sx={{ fontWeight: 'bold', width: '50px', height: '50px', display: 'flex', color: 'white', alignItems: 'center', justifyContent: 'center', backgroundColor: theme(true).primary, borderRadius: '100%', fontSize: '18px' }}>{shortenNumber(ctx?.userData?.clients, 0)}</Typography></Zoom>
                    <Typography sx={{ ml: 3 }}>Clients connected</Typography>
                </Paper>
                <Paper sx={{ ml: 2, mt: 0.5, p: 2, width: '300px', borderRadius: '10px', display: 'flex', alignContent: 'center', alignItems: 'center' }}>
                    <Zoom in={active}>
                        <Typography variant='h5' sx={{ fontWeight: 'bold', color: 'white', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: theme(true).primary, borderRadius: '100%', fontSize: '18px' }}>{shortenNumber(ctx?.userData?.messagesSendToday?.count, 0)}</Typography>
                    </Zoom>
                    <Typography sx={{ ml: 3 }}>Messages send today</Typography>
                </Paper>
                <Paper sx={{ ml: 2, mt: 0.5, p: 2, width: '300px', borderRadius: '10px', display: 'flex', alignContent: 'center', alignItems: 'center' }}>
                    <Zoom in={active}>
                        <Typography variant='h5' sx={{ fontWeight: 'bold', color: 'white', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: theme(true).primary, borderRadius: '100%', fontSize: '18px' }}>{shortenNumber(ctx?.userData?.messagesSendMonth?.count, 0)}</Typography>
                    </Zoom>
                    <Typography sx={{ ml: 3 }}>Messages send this month</Typography>
                </Paper>
            </Box>
            <Box sx={{ ml: 2, mt: 2, mr: 2, mb: 2 }}>
                <Paper sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}><Typography>Recent messages</Typography><Typography sx={{ fontSize: '10px', color: 'GrayText', ml: 1 }}>(Fetched from devices)</Typography></Box>
                    <br />
                    <Box sx={{ maxHeight: '70vh', overflowY: 'scroll' }}>
                        {messages.map((e:{to:string,message:string}) => {
                            return <><Box sx={{ display: 'flex' }}>
                                <Box sx={{ width: '50px', minWidth: '50px', minHeight: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: theme(ctx.isNight).grey, borderRadius: '100%' }}>
                                    <WhatsApp sx={{ width: '25px', height: '25px' }} />
                                </Box>
                                <Box sx={{ ml: 2 }}>
                                    <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>{e.to}</Typography>
                                    <Collapse in={active}>
                                        <Typography sx={{ fontSize: '14px', color: 'GrayText', maxWidth: '70%' }}>{e.message}</Typography>
                                    </Collapse>
                                </Box>
                            </Box>
                                <br />
                                <Divider variant='middle' />
                                <br />
                            </>
                        })}
                    </Box>
                </Paper>
            </Box>
        </Box>

    )
}

export default Home