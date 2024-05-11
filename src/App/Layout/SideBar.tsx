import { BarChartRounded, HomeRounded, PersonRounded, SmartphoneOutlined, ApiRounded, AndroidRounded } from '@mui/icons-material'
import { Box, Grow, Typography } from '@mui/material'
import AppCtx from "../Configs/Context"
import { useContext } from 'react'
import theme from '../Configs/theme'
import { useNavigate } from 'react-router-dom'

function SideBar() {

    const nav = useNavigate()
    const ctx: any = useContext(AppCtx)

    const SideBarElement: { title: string, icon: any, onClick?: () => void }[] = [
        { title: 'Home', icon: HomeRounded, onClick: () => nav('/') },
        { title: 'Devices', icon: SmartphoneOutlined, onClick: () => nav('/devices') },
        { title: 'Api', icon: ApiRounded, onClick: () => {ctx.setActive('api');nav('/api')} },
        { title: 'Download', icon: AndroidRounded, onClick: () =>{ctx.setActive('download');nav('/download')} }
    ]

    return (
        <Box sx={{ width: '100%', height: '100vh' }}>
            <Box>
                <center>
                    <br />
                    <br />
                    <Box sx={{ backgroundColor: theme(true).primary, borderRadius: '100%', width: '70px', height: '70px', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                        <PersonRounded sx={{ width: '70%', height: '70%', color: 'white' }} />
                    </Box>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>{ctx?.userData?.name}</Typography>
                    <Typography sx={{ color: 'GrayText' }}>{ctx?.userData?.email}</Typography>
                </center>
                <br />
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ width: '90%' }}>
                        <Typography sx={{ fontWeight: 'bold' }}>Menu</Typography>
                        {
                            SideBarElement.map((e) => {
                                let active = ctx.active === e.title.toLocaleLowerCase()
                                return <Grow in>
                                    <Box onClick={e.onClick} className={`${ctx.isNight ? active ? 'selectedItem_dark' : 'listItem_dark' : active ? 'selectedItem' : 'listItem'}`} sx={{ display: 'flex', justifyContent: 'left', p: 1.5, mt: 0.5 }}>{<e.icon sx={{}} />} <Typography sx={{ ml: 2 }}>{e.title}</Typography></Box>
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