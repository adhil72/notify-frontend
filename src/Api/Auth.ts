import instance from "./Config";

const loginController = (body: { email: string, password?: string }) => {
    try {
        return instance.post('/auth/login', body)
    } catch (error) {
        throw error
    }
}

const updatePasswordController = (body: { password: string }) => {
    try {
        return instance.post('/auth/update/password', body)
    } catch (error) {
        throw error
    }
}

const updateNameController = (body: { name: string }) => {
    try {
        return instance.post('/auth/update/name', body)
    } catch (error) {
        throw error
    }
}

const updateUserNameController = (body: { username: string }) => {
    try {
        return instance.post('/auth/update/username', body)
    } catch (error) {
        throw error
    }
}

const getUserDataController = () => {
    try {
        return instance.get('/auth/get/user')
    } catch (error) {
        throw error
    }
}

const generateTokenController = () => {
    try {
        return instance.get('/auth/api/token')
    } catch (error) {
        throw error
    }
}

export { loginController, updatePasswordController, updateNameController, updateUserNameController, getUserDataController, generateTokenController }