import { BarChartRounded, HomeRounded, PersonRounded, SmartphoneOutlined, WhatsApp } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import AppCtx from "../Configs/Context"
import { useContext } from 'react'
import theme from '../Configs/theme'

function SideBar() {
    const SideBarElement: { title: string, icon: any, onClick?: (index: number) => void }[] = [
        { title: 'Home', icon: HomeRounded },
        { title: 'Devices', icon: SmartphoneOutlined },
        { title: 'Stats', icon: BarChartRounded }
    ]
    const ctx: any = useContext(AppCtx)
    return (
        <Box sx={{ width: '100%', height: '100vh' }}>
            <Box>
                <center>
                    <br />
                    <br />
                    <Box sx={{ backgroundColor: theme(true).primary, borderRadius: '100%', width: '70px', height: '70px', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                        <PersonRounded sx={{ width: '70%', height: '70%', color: 'white' }} />
                    </Box>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>User</Typography>
                    <Typography sx={{ color: 'GrayText' }}>user@gmail.com</Typography>
                </center>
                <br />
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ width: '90%' }}>
                        <Typography sx={{ fontWeight: 'bold' }}>Menu</Typography>
                        {
                            SideBarElement.map((e) => {
                                let active = ctx.active === e.title.toLocaleLowerCase()
                                return <Box className={`${active ? 'selectedItem' : 'listItem'}`} sx={{ display: 'flex', justifyContent: 'left', p: 1.5, mt: 0.5 }}>{<e.icon sx={{}} />} <Typography sx={{ ml: 2 }}>{e.title}</Typography></Box>
                            })
                        }
                    </Box>
                </Box>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ width: '90%' }}>
                        <Typography sx={{ fontWeight: 'bold' }}>Last Messages</Typography>
                        <br />
                        {[1, 2, 3, 4, 5].map((i) => {
                            return <>
                                <Box sx={{ display: 'flex', mt: 1 }}>
                                    <Box sx={{ width: '40px', height: '40px', borderRadius: '100%', backgroundColor: 'lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <WhatsApp sx={{ width: '20px', height: '20px' }} />
                                    </Box>
                                    <Box sx={{ ml: 2 }}>
                                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>User</Typography>
                                        <Typography sx={{ fontSize: '12px' }}>{"This is a sample message i wanted to share with you becaoudse it is a test message".slice(0, 34)}...</Typography>
                                    </Box>
                                </Box>
                                {/* <Divider sx={{ mt: 0.8 }} variant='middle' /> */}
                            </>
                        })}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default SideBar