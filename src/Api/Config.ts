import axios from "axios";
const instance = axios.create({ baseURL: 'https://notifybakc.fly.dev', headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })

function updateHeader(key: string, value: string) {
    instance.defaults.headers[key] = value
}
export { updateHeader }
export default instance;