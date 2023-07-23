import { Box, Button, CircularProgress, Grow, IconButton, Paper, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import AppContext from "../Configs/Context"
import { Brightness5Rounded, Brightness7Rounded } from '@mui/icons-material'
import { confirmVerification, createAuthRequest, createVerification, generateToken, updatePassword } from '../../Api/Auth'

function Auth() {
    const appCtx: any = useContext(AppContext)
    const [inputText, setInputText] = useState('')
    const [inputProps, setinputProps] = useState({ label: 'Email', type: 'email', hint: '' })
    const [processing, setProcessing] = useState(true)
    const [userData, setUserData] = useState({
        "id": "",
        "email": "",
        "name": "",
        "password": "false",
        "verified": false
    })

    const handleNextClick = () => {
        setProcessing(true)
        console.log(userData);

        let value = inputText
        if (inputProps.label === 'Email') {
            createAuthRequest(value).then((res) => {
                setUserData(res.data)
                handleUiChange(res.data)
            }).catch((err) => {
                console.log(err);
                handleUiChange()
            })
        } else if (inputProps.label === 'Add password') {
            let password = inputText
            updatePassword({ password, id: userData.id }).then((res) => {
                userData.password = "true"
                setUserData(userData)
                localStorage.setItem('token', JSON.stringify(res.data.access))
                handleUiChange(userData)
            })
        } else if (inputProps.label === 'Password') {
            let password = inputText
            generateToken({ password, id: userData.id }).then((res) => {
                setUserData(userData)
                userData.password = "true"
                localStorage.setItem('token', JSON.stringify(res.data.access))
                handleUiChange(userData)
            })
        } else if (inputProps.label === 'Code') {
            let code = inputText
            confirmVerification({ id: userData.id, code }).then((res) => {
                userData.verified = true
                setUserData(userData)
                handleUiChange(userData)
            })
        }
    }

    const handleUiChange = (userData?: any) => {
        if (userData) {
            if (userData.id === "") {
                setInputText('')
                setinputProps({ label: 'Email', type: 'email', hint: 'Enter your email to login in' })
                setProcessing(false)
            } else if (userData.password === "false") {
                setInputText('')
                setinputProps({ label: 'Add password', type: 'password', hint: 'Add a password to your account' })
                setProcessing(false)
            } else if (userData.password === "true" && localStorage.getItem('token') === null) {
                setInputText('')
                setinputProps({ label: 'Password', type: 'password', hint: 'Enter your password' })
                setProcessing(false)
            } else if (userData.verified === false) {
                createVerification(userData.id).then((res) => {
                    setInputText('')
                    setinputProps({ label: 'Code', type: 'tel', hint: 'We have send an mail with code to ' + userData.email + '' })
                    setProcessing(false)
                })
            } else {
                window.location.href = '/'
            }
        }
    }

    useEffect(() => {
        handleUiChange(userData)
    }, [])


    return (
        <>
            <Box sx={{ position: 'fixed', width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton sx={{ mr: 1, mt: 1 }} onClick={() => {
                    appCtx.setIsNight(!appCtx.isNight); console.log('done', appCtx);
                }}>
                    {appCtx.isNight ? <Brightness7Rounded /> : <Brightness5Rounded />}
                </IconButton>
            </Box>

            <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grow in>
                    <Paper sx={{ width: '300px', height: 'fit-content', p: 4, borderRadius: '30px' }}>
                        <center>
                            <br />
                            <Box>
                                <img style={{ width: '160px', height: 'auto', borderRadius: '100%' }} src={require("../../Assets/Logo.png")} alt="logo" />
                                {processing && <CircularProgress size={'170px'} sx={{ position: 'fixed', ml: '-165px', mt: '-5px' }} />}
                            </Box>
                            <Typography variant='h6'>Login to Notify</Typography>
                            <Typography sx={{ color: 'gray', fontSize: '15px', width: '250px', overflow: 'visible' }}>{inputProps.hint}</Typography>
                            <TextField disabled={processing} label={inputProps.label} InputProps={{ sx: { borderRadius: '20px' } }} type={inputProps.type} fullWidth value={inputText} onChange={(t) => setInputText(t.target.value)} />
                            <br />
                            <Button onClick={handleNextClick} disabled={processing} sx={{ p: 1, borderRadius: '10px', mt: 1 }} fullWidth variant='contained'>Next</Button>
                        </center>
                    </Paper>
                </Grow>
            </Box>
        </>
    )
}

export default Auth