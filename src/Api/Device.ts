import instance from "./Config";

const generateAddToken = () => {
    return instance.post('/devices/add/request')
}

const getAllDevices = () => {
    return instance.get('/devices/get')
}
export { generateAddToken, getAllDevices }