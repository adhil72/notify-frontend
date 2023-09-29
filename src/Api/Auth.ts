import instance from "./Config";

const loginController = (body: { email: string }) => {
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

export { loginController, updatePasswordController, updateNameController, updateUserNameController }