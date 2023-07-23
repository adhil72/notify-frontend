import { BarChartRounded, HomeRounded, PersonRounded, SmartphoneOutlined, WhatsApp } from '@mui/icons-material'
import { Box, Grow, Typography } from '@mui/material'
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
                                return <Grow in>
                                    <Box className={`${ctx.isNight ? active ? 'selectedItem_dark' : 'listItem_dark' : active ? 'selectedItem' : 'listItem'}`} sx={{ display: 'flex', justifyContent: 'left', p: 1.5, mt: 0.5 }}>{<e.icon sx={{}} />} <Typography sx={{ ml: 2 }}>{e.title}</Typography></Box>
                                </Grow>
                            })
                        }
                    </Box>
                </Box>
                
            </Box>
        </Box>
    )
}

export default SideBar