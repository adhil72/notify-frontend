import instance from "./Config";

const generateAddToken = () => {
    return instance.get('/device/new/generate')
}
export { generateAddToken }