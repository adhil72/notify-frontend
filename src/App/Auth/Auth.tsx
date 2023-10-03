import { Box, Button, CircularProgress, Collapse, Grow, IconButton, Paper, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import AppContext from "../Configs/Context"
import { Brightness5Rounded, Brightness7Rounded } from '@mui/icons-material'
import { loginController, updateNameController, updatePasswordController, updateUserNameController } from '../../Api/Auth'
import { updateHeader } from '../../Api/Config'
import { useNavigate } from 'react-router-dom'

function Auth() {
    const appCtx: any = useContext(AppContext)
    const [inputText, setInputText] = useState('')
    const [inputProps, setinputProps] = useState({ label: 'Email', type: 'email', hint: '' })
    const [processing, setProcessing] = useState(true)
    const submit = useRef<HTMLButtonElement>(null)
    const nav = useNavigate()
    const [error, setError] = useState("")

    useEffect(() => {
        let state = { email: '', password: '', name: '', username: '', newAccount: true }
        setTimeout(async () => {

            async function analyzeState() {
                if (state.email === '') {
                    setinputProps({ hint: 'Enter your email', label: 'Email', type: 'email' })
                    setProcessing(false)
                    state.email = await waitForResponse()
                    setProcessing(true)
                    await new Promise(async (r) => {
                        let response = await loginController({ email: state.email }).catch((err) => { return { data: err.response } })
                        if (response.data.data.message === 'email already exists') {
                            state.newAccount = false
                        } else {
                            localStorage.setItem('token', response.data.data.token)
                            updateHeader('Authorization', `Bearer ${localStorage.getItem('token')}`)
                            r(null)
                        } localStorage.setItem('token', response.data.data.token)
                        updateHeader('Authorization', `Bearer ${localStorage.getItem('token')}`)
                        r(null)
                    })
                } else if (state.password === '') {
                    if (state.newAccount) setinputProps({ label: 'Password', hint: 'Create a password', type: 'password' })
                    else setinputProps({ label: 'Password', hint: 'Enter your password', type: 'password' })
                    setProcessing(false)
                    state.password = await waitForResponse()
                    setError("")
                    setProcessing(true)
                    if (state.newAccount) {
                        await new Promise(async (r) => {
                            await updatePasswordController({ password: state.password })
                            r(null)
                        })
                    } else {
                        let response = await loginController({ email: state.email, password: state.password }).catch((err) => err.message)
                        if (response.status == 200) {
                            localStorage.setItem('token', response.data.data.token)
                            updateHeader('Authorization', `Bearer ${localStorage.getItem('token')}`)
                            state.email = 'verified'; state.password = 'verified'; state.name = 'verified'; state.username = 'verified'
                        } else {
                            state.password = ''
                            setError('Incorrect password')
                        }
                    }
                } else if (state.username === '') {
                    setinputProps({ label: 'Username', hint: 'Create a username', type: 'text' })
                    setProcessing(false)
                    state.username = await waitForResponse()
                    setProcessing(true)
                    await new Promise(async (r) => {
                        let res = await updateUserNameController({ username: state.username })
                        if (res.status != 200) {
                            state.username = ''
                        }
                        r(null)
                    })
                } else if (state.name === '') {
                    setinputProps({ label: 'Name', hint: 'Create a Name', type: 'text' })
                    setProcessing(false)
                    state.name = await waitForResponse()
                    setProcessing(true)
                    await new Promise(async (r) => {
                        await updateNameController({ name: state.name })
                        r(null)
                    })
                }

                setTimeout(() => {
                    if (state.email === '' || state.name === '' || state.password === '' || state.username === '') {
                        analyzeState()
                    } else {
                        nav('/')
                    }
                }, 500);

            }

            analyzeState()

        }, 1000);
    }, [])

    const waitForResponse = () => {
        return new Promise<string>((res, rej) => {
            if (submit.current) {
                submit.current.onclick = (e) => {
                    setInputText((old) => {
                        res(old)
                        return ''
                    })
                }
            }
        })
    }


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
                            <Typography variant='h6'>{processing ? "Just a sec" : "Login to Notify"}</Typography>
                            <Typography sx={{ color: error === '' ? 'gray' : 'red', fontSize: '15px', width: '250px', overflow: 'visible' }}>{error !== '' ? error : !processing && inputProps.hint}</Typography>

                            <Collapse in={!processing}>
                                <TextField disabled={processing} label={inputProps.label} InputProps={{ sx: { borderRadius: '20px' } }} type={inputProps.type} fullWidth value={inputText} onChange={(t) => setInputText(t.target.value)} />
                                <br />
                                <Button ref={submit} disabled={processing} sx={{ p: 1, borderRadius: '10px', mt: 1 }} fullWidth variant='contained'>Next</Button>
                            </Collapse>
                        </center>
                    </Paper>
                </Grow>
            </Box>
        </>
    )
}

export default Auth