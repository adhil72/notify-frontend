import axios from "axios";
const instance = axios.create({ baseURL: 'http://localhost:50000', headers: { token: (localStorage.getItem("token")) } })

function updateHeader(key: string, value: string) {
    instance.defaults.headers[key] = value
}
export { updateHeader }
export default instance;