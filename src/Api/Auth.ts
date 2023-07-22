import instance from "./Config";

const createAuthRequest = (email: string) => {
    return instance.post("/auth/create", { email })
}

const updatePassword = (body: { password: string, id: string }) => {
    return instance.post("/auth/update/password", body)
}

const createVerification = (id: string) => {
    return instance.post('/auth/verify', { id })
}

const confirmVerification = (props: { id: string, code: string }) => {
    return instance.post('/auth/verify', props)
}

const generateToken = (props: { id: string, password: string }) => {
    console.log(props);
    
    return instance.post('/auth/token', props)
}

export { createAuthRequest, updatePassword, confirmVerification, createVerification, generateToken }