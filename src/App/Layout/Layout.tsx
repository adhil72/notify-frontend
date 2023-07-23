import { Box, Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SideBar from './SideBar'

function Layout({ child }: { child: any }) {

    const router = useLocation()
    const [pageProps, setpageProps] = useState({ w1: '10%', w2: '90%' })

    useEffect(() => {
        if (router.pathname === '/auth') {
            setpageProps({ w1: '0%', w2: '100%' })
        } else {
            setpageProps({ w1: '18%', w2: '83%' })
        }
    }, [router.pathname])


    return (
        <Box sx={{ width: '100%', height: '100vh', display: 'flex' }}>
            <Paper sx={{ width: pageProps.w1, height: '100vh' }}>
                <SideBar />
            </Paper>
            <Box sx={{ width: pageProps.w2, height: '100vh' }}>
                {child}
            </Box>
        </Box>
    )
}

export default Layout