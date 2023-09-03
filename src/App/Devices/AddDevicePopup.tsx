import { Box, Button, CircularProgress, Dialog, Grow, Paper, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import theme from '../Configs/theme'
import Ctx from "../Configs/Context"
import QRCode from 'qr-code-styling'
import { generateAddToken } from '../../Api/Device'

function AddDevicePopup({ open, onClose }: { open: any, onClose?: () => void }) {
    const ctx: any = useContext(Ctx)
    const [Qr, setQr] = useState<any>()
    const [processing, setProcessing] = useState(false)

    const generateQr = () => {
        setProcessing(true)
        generateAddToken().then(({ data }) => {
            const qrCode = new QRCode({
                width: 250,
                height: 250,
                type: "svg",
                data:JSON.stringify({access:localStorage.getItem("access"),token:data.token}),
                dotsOptions: {
                    color: theme(!ctx.isNight).primary,
                    type: "rounded"
                },
                backgroundOptions: {
                    color: theme(!ctx.isNight).color,
                },
                imageOptions: {
                    crossOrigin: "anonymous",
                    margin: 20
                }
            });

            qrCode.getRawData('png').then((d) => {
                let url = URL.createObjectURL(d as Blob)
                setQr(url)
            })
        })
    }


    return (
        <Dialog open={open} onClose={onClose} PaperProps={{ sx: { width: 'fitcontent', height: 'fit-content', backgroundColor: 'black' } }}>
            <Box sx={{ backgroundColor: theme(!ctx.isNight).color, width: '100%', height: '100%' }}>
                <Box sx={{ p: 2 }}>
                    <center>
                        <Typography>Scan this in your phone</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '250px', height: '250px', border: 'solid 1px ' + theme(ctx.isNight).grey, borderRadius: '10px', overflow: 'hidden' }}>
                            {(!processing && Qr == null) && <Button onClick={generateQr}>Generate Qr</Button>}
                            {(Qr == null && processing) && <CircularProgress />}
                            <Grow in={Qr != null}>
                                <img style={{}} src={Qr} alt="" />
                            </Grow>
                        </Box>
                    </center>
                </Box>
            </Box>
        </Dialog>
    )
}

export default AddDevicePopup