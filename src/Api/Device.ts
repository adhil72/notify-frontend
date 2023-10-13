import instance from "./Config";

const generateAddToken = () => {
    return instance.post('/devices/add/request')
}

const getAllDevices = () => {
    return instance.get('/devices/get')
}

const testDeviceController = (body: { to: string, message: string }) => {
    return instance.post('/devices/send', body)
}

export { generateAddToken, getAllDevices, testDeviceController }