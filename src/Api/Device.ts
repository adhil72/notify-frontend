import instance from "./Config";

export const generateAddToken = () => {
    return instance.post('/devices/add/request')
}

export const getAllDevices = () => {
    return instance.get('/devices/get')
}

export const testDeviceController = (body: { to: string, message: string }) => {
    return instance.post('/devices/messages/send', body)
}

export const getMessagesController = () => {
    return instance.get('/devices/messages/get')
}
